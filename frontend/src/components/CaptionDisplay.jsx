import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

const CaptionDisplay = ({ caption, hashtags }) => {
    const [copied, setCopied] = useState(false);

    const fullText = `${caption}\n\n${hashtags}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'CaptionKatha Caption',
                    text: fullText,
                });
            } catch (err) {
                // console.error('Error sharing:', err);
            }
        } else {
            alert('Web Share API not supported in this browser');
        }
    };

    if (!caption) return null;

    return (
        <div className="animate-fade-in" style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'var(--color-dark-gray)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--color-gray)'
        }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-light-gray)' }}>Generated Caption</h3>

            <div style={{
                fontSize: '1.2rem',
                marginBottom: '1.5rem',
                whiteSpace: 'pre-line'
            }}>
                {caption}
            </div>

            <div style={{
                color: 'var(--color-light-gray)',
                marginBottom: '2rem',
                fontStyle: 'italic'
            }}>
                {hashtags}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={handleCopy}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        background: copied ? '#4CAF50' : 'var(--color-white)',
                        color: copied ? 'white' : 'var(--color-black)',
                        borderRadius: 'var(--border-radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: '600',
                        transition: 'var(--transition)'
                    }}
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied ? 'Copied!' : 'Copy Caption'}
                </button>

                <button
                    onClick={handleShare}
                    style={{
                        padding: '1rem',
                        background: 'transparent',
                        color: 'var(--color-white)',
                        border: '1px solid var(--color-white)',
                        borderRadius: 'var(--border-radius)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: '600',
                        transition: 'var(--transition)'
                    }}
                >
                    <Share2 size={20} />
                    Share
                </button>
            </div>
        </div>
    );
};

export default CaptionDisplay;
