import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__links">
                <span>API Sourse: <a className="footer__link" target="_blank" href="https://omdbapi.com">OMDb API</a></span>
                <span>Backend: <a className="footer__link" target="_blank" href="https://console.firebase.google.com">Firebase</a></span>
            </div>
            <br />
            Copyright © 2023 Vitalii Kotenko
        </div>
    );
}

export default Footer;
