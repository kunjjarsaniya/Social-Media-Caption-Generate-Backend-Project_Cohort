import React from 'react';

const languages = [
    { id: 'Hindi', label: 'Hindi' },
    { id: 'Gujarati', label: 'Gujarati' },
    { id: 'English', label: 'English' },
    { id: 'Hinglish', label: 'Hinglish' },
];

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
    return (
        <div style={{ margin: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-light-gray)' }}>Select Language</h3>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem'
            }}>
                {languages.map((lang) => (
                    <button
                        key={lang.id}
                        onClick={() => onSelectLanguage(lang.id)}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: selectedLanguage === lang.id ? 'var(--color-white)' : 'transparent',
                            color: selectedLanguage === lang.id ? 'var(--color-black)' : 'var(--color-white)',
                            border: '1px solid var(--color-gray)',
                            borderRadius: '2rem',
                            transition: 'var(--transition)',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
