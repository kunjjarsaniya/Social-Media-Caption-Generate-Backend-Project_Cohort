import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: 'var(--color-gray)',
            fontSize: '0.9rem',
            marginTop: 'auto'
        }}>
            <p>&copy; {new Date().getFullYear()} CaptionKatha. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
