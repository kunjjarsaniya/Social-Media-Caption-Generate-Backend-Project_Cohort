import React from 'react';

const modes = [
    { id: 'Funny', label: 'Funny (Masti)', emoji: '😂' },
    { id: 'Professional', label: 'Professional (Vyavsay)', emoji: '💼' },
    { id: 'Festive', label: 'Festive (Tyohar)', emoji: '🎉' },
    { id: 'Gujarati', label: 'Gujarati Special', emoji: '🪁' },
    { id: 'Poetic', label: 'Poetic (Kavita)', emoji: '✍️' },
    { id: 'Motivational', label: 'Motivational (Prerna)', emoji: '💪' },
];

const ModeSelector = ({ selectedMode, onSelectMode }) => {
    return (
        <div style={{ margin: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-light-gray)' }}>Select Vibe</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
            }}>
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => onSelectMode(mode.id)}
                        style={{
                            padding: '1rem',
                            background: selectedMode === mode.id ? 'var(--color-white)' : 'var(--color-dark-gray)',
                            color: selectedMode === mode.id ? 'var(--color-black)' : 'var(--color-white)',
                            border: '1px solid var(--color-dark-gray)',
                            borderRadius: 'var(--border-radius)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'var(--transition)',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>{mode.emoji}</span>
                        {mode.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModeSelector;
