/* Stub storage service - no external ImageKit dependency */

/**
 * uploadImage stub function.
 * Returns a placeholder URL for the uploaded file.
 * This removes the external ImageKit dependency.
 */
async function uploadImage(file, filename) {
    const placeholderUrl = `http://localhost/uploads/${filename}`;
    return placeholderUrl;
}

module.exports = { uploadImage };   