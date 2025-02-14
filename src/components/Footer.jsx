// src/Footer.js
import React from 'react';
import './styles/Footer.css'; // Tùy chọn: import file CSS để định dạng footer

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
