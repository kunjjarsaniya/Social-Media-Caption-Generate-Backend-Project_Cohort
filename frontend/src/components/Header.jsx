import React from 'react';
import { Camera } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--color-dark-gray)',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Camera size={32} color="white" />
                    <h1 style={{ fontSize: '1.8rem', margin: 0 }}>CaptionKatha</h1>
                </div>
                <nav>
                    {/* Add navigation items if needed */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
