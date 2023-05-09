import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span>
                API Sourse:
                <a className="footer__link"
                    target="_blank"
                    href="https://omdbapi.com"
                >
                    OMDb API
                </a>
            </span>
            <br />
            Copyright © 2023 Vitalii Kotenko
        </div>
    );
}

export default Footer;
