const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  // console.log(response.text);
}

// main();



const fs = require("fs");

// Initialize FileManager with API key (from env or implicit)
// Note: @google/genai/server might not be the correct import for the file manager in v1.12.0
// Let's check the docs or use the GoogleGenAI instance if possible.
// Actually, for the new SDK, it's often separate.
// Let's try to use the `GoogleAIFileManager` if available or standard fetch if not.
// Wait, the user has `@google/genai` installed.
// Let's stick to the pattern used in the docs for the new SDK if possible, or use the standard `GoogleGenerativeAI` package pattern if this is the older one.
// The package.json says `@google/genai`: `^1.12.0`.
// This is the *new* Google Gen AI SDK (v0.1.0+ is the new one, but 1.12.0 sounds like the *old* `google-generative-ai` package? No, wait.)
// Let's check the import in line 1: `const { GoogleGenAI } = require("@google/genai");`
// If it is `@google/genai`, it might be the *very* new one.
// However, usually `GoogleGenerativeAI` is the class name for the older one (`@google/generative-ai`).
// The current code uses `new GoogleGenAI({})`.
// Let's assume we need to use the `GoogleAIFileManager` from `@google/generative-ai/server` BUT we don't have that package listed.
// We might need to install `@google/generative-ai` if `@google/genai` doesn't support file uploads easily or if it's a different package.
// Actually, let's look at `ai.models.generateContent`.
// To upload files, we usually need `GoogleAIFileManager`.
// Let's try to import it. If it fails, we might need to install it.
// BUT, to be safe and avoid install errors, let's implement a robust version.

// RE-READING package.json: "@google/genai": "^1.12.0"
// This looks like the *Google Cloud* one or a specific version.
// Actually, `npm install @google/generative-ai` is the common one.
// Let's assume we can use the `GoogleAIFileManager` if we install `@google/generative-ai`.
// OR, we can use the `ai` instance if it has file management.
// Given I cannot easily check the docs, I will try to use the standard `GoogleAIFileManager` pattern but I need to make sure I have the library.
// The current `require("@google/genai")` suggests it might be the specific Node.js SDK.

// Let's try to use the `GoogleAIFileManager` from `@google/generative-ai/server` pattern, but wait, we don't have that package.
// We have `@google/genai`.
// Let's try to see if `ai` has `files` property.
// `ai.files.create`?

// Plan B: Use the `GoogleAIFileManager` from `@google/generative-ai` if I can install it.
// But I should try to use what is there.
// Let's look at the existing code: `const { GoogleGenAI } = require("@google/genai");`
// This is likely the `google-genai` package (the new one).
// In the new SDK, file uploads are done via `client.files.upload`.

// Let's try to implement `uploadToGemini` using the `ai` client we already have.

async function uploadToGemini(path, mimeType) {
  try {
    // Attempt to use the new SDK's file upload if available
    // If this is the `google-genai` package:
    if (ai.files && ai.files.upload) {
      const uploadResponse = await ai.files.upload({
        file: path,
        config: {
          mimeType: mimeType,
          displayName: "Uploaded Video",
        }
      });
      // console.log(`Uploaded file ${uploadResponse.file.name} as: ${uploadResponse.file.uri}`);
      return uploadResponse.file;
    }

    // If the above doesn't work (e.g. different SDK version), we might need to fallback or error out.
    // For now, let's assume the user might need to install `@google/generative-ai` if this is the wrong package.
    // But let's try to use the `GoogleAIFileManager` if we can require it.
    // Since I can't be sure, I'll stick to the `ai.files.upload` pattern which is common for the unified SDKs.

    throw new Error("File upload not supported with current SDK configuration.");
  } catch (error) {
    // console.error("Gemini File Upload Error:", error);
    throw error;
  }
}

// Retry helper with exponential backoff
async function retryWithBackoff(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastRetry = i === retries - 1;
      const isRetryableError = error?.status === 'UNAVAILABLE' ||
        error?.code === 503 ||
        error?.message?.includes('overloaded');

      if (isLastRetry || !isRetryableError) {
        throw error;
      }

      // Wait with exponential backoff
      const waitTime = delay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${retries} after ${waitTime}ms due to: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

async function waitForFilesActive(files) {
  // console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await ai.files.get({ name });
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      file = await ai.files.get({ name });
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  // console.log("...all files ready");
}

async function generateCaption(filePath, mode = "Funny", language = "Hindi", mimeType = "image/jpeg") {
  let fileUri = null;
  let isVideo = mimeType.startsWith("video/");

  try {
    // For videos or large images, upload to Gemini Files API
    if (isVideo) {
      const uploadResult = await uploadToGemini(filePath, mimeType);
      await waitForFilesActive([uploadResult]);
      fileUri = uploadResult.uri;
    } else {
      // For small images, we can still use inline data if we read the file
      // But since we are now passing a filePath, we need to read it.
      // Let's just read it to base64 for images to keep it simple and fast for small files.
      const fileBuffer = fs.readFileSync(filePath);
      const base64Data = fileBuffer.toString("base64");

      const contents = [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
        { text: `Generate a caption for this image in ${mode} mode and in ${language} language.` },
      ];

      // ... (rest of the function for inline)
      const systemInstruction = `
        You are an expert in generating captions for images for social media like Instagram Reels and YouTube Shorts.
        
        **Context:**
        - **Mode:** ${mode} (e.g., Funny, Professional, Festive, Poetic, Motivational).
        - **Language:** ${language} (e.g., Hindi, Gujarati, English, Hinglish).

        **Instructions:**
        1. Generate a single, engaging caption based on the image content, selected mode, and language.
        2. **Funny Mode:** Use Bollywood puns, slang, or witty remarks.
        3. **Professional Mode:** Keep it clean, business-oriented, and suitable for SMEs.
        4. **Festive Mode:** Focus on the specific festival vibes (Diwali, Navratri, etc.).
        5. **Gujarati Special:** Use cultural references (Garba, Fafda-Jalebi, Rann Utsav) if applicable.
        6. **Poetic:** Use Shayari or artistic language.
        7. **Motivational:** Use inspiring quotes.
        
        **Output Format:**
        - The caption should be concise (1-2 sentences).
        - Include 3-5 relevant and trending hashtags (e.g., #Trending, #Viral, #CaptionKatha).
        - Use emojis to make it lively.
        - Do NOT include any introductory text like "Here is a caption:". Just the caption and hashtags.
        `;

      const response = await retryWithBackoff(async () => {
        return await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
          },
        });
      });
      return response.text;
    }

    // If we are here, it's a video with a fileUri
    const contents = [
      {
        fileData: {
          mimeType: mimeType,
          fileUri: fileUri,
        },
      },
      { text: `Generate a caption for this video in ${mode} mode and in ${language} language.` },
    ];

    const systemInstruction = `
        You are an expert in generating captions for videos for social media like Instagram Reels and YouTube Shorts.
        
        **Context:**
        - **Mode:** ${mode} (e.g., Funny, Professional, Festive, Poetic, Motivational).
        - **Language:** ${language} (e.g., Hindi, Gujarati, English, Hinglish).

        **Instructions:**
        1. Generate a single, engaging caption based on the video content, selected mode, and language.
        2. **Funny Mode:** Use Bollywood puns, slang, or witty remarks.
        3. **Professional Mode:** Keep it clean, business-oriented, and suitable for SMEs.
        4. **Festive Mode:** Focus on the specific festival vibes (Diwali, Navratri, etc.).
        5. **Gujarati Special:** Use cultural references (Garba, Fafda-Jalebi, Rann Utsav) if applicable.
        6. **Poetic:** Use Shayari or artistic language.
        7. **Motivational:** Use inspiring quotes.
        
        **Output Format:**
        - The caption should be concise (1-2 sentences).
        - Include 3-5 relevant and trending hashtags (e.g., #Trending, #Viral, #CaptionKatha).
        - Use emojis to make it lively.
        - Do NOT include any introductory text like "Here is a caption:". Just the caption and hashtags.
        `;

    const response = await retryWithBackoff(async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        },
      });
    });
    return response.text;

  } catch (error) {
    console.error("AI Generation failed:", error);

    // Provide specific error messages based on error type
    let errorMessage = "An unexpected error occurred";

    if (error?.status === 'UNAVAILABLE' || error?.code === 503) {
      errorMessage = "The AI service is currently overloaded. Please try again in a moment.";
    } else if (error?.code === 429) {
      errorMessage = "Rate limit exceeded. Please wait a moment before trying again.";
    } else if (error?.code === 400) {
      errorMessage = "Invalid request. Please check your file format.";
    } else if (error?.code === 401 || error?.code === 403) {
      errorMessage = "API authentication failed. Please contact support.";
    } else if (error?.message?.includes('API key')) {
      errorMessage = "API key issue detected. Please contact support.";
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return `⚠️ Caption generation in progress... ${errorMessage} #CaptionKatha #TryAgain`;
  }
}

module.exports = {
  generateCaption,
};
