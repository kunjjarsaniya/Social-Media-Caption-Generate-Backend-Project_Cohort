import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadComponent from '../components/UploadComponent';
import ModeSelector from '../components/ModeSelector';
import LanguageSelector from '../components/LanguageSelector';
import CaptionDisplay from '../components/CaptionDisplay';

const Home = () => {
    // Main component for caption generation
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [mode, setMode] = useState('Funny');
    const [language, setLanguage] = useState('Hindi');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageSelect = (file, previewUrl) => {
        setImage(file);
        setPreview(previewUrl);
        setResult(null);
        setError(null);
    };

    const handleGenerate = async () => {
        if (!image) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', image);
        formData.append('mode', mode);
        formData.append('language', language);

        try {
            const response = await axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const fullCaption = response.data.post.caption;

            setResult({
                caption: fullCaption,
                hashtags: ''
            });
        } catch (err) {
            // console.error(err);
            const errorMessage = err.response?.data?.message || 'Failed to generate caption. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <main className="container" style={{ flex: 1, paddingBottom: '4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            Turn Photos into <span style={{ color: 'var(--color-gray)' }}>Stories</span>
                        </h2>
                        <p style={{ color: 'var(--color-light-gray)', fontSize: '1.1rem' }}>
                            Generate culturally relevant captions for your social media in seconds.
                        </p>
                    </div>

                    <UploadComponent onImageSelect={handleImageSelect} />

                    {image && (
                        <div className="animate-fade-in">
                            <ModeSelector selectedMode={mode} onSelectMode={setMode} />
                            <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <button
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    style={{
                                        padding: '1rem 3rem',
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        background: 'var(--color-white)',
                                        color: 'var(--color-black)',
                                        borderRadius: '2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        opacity: loading ? 0.7 : 1,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        transition: 'var(--transition)',
                                        boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Generating Magic...
                                        </>
                                    ) : (
                                        'Generate Caption'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'rgba(255,0,0,0.1)',
                            border: '1px solid red',
                            borderRadius: 'var(--border-radius)',
                            color: '#ff6b6b',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {result && (
                        <CaptionDisplay
                            caption={result.caption}
                            hashtags={result.hashtags}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
