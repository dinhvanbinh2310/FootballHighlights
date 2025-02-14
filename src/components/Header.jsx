// src/Header.js
import React from 'react';
import './styles/Header.css'; // Tùy chọn: import file CSS để định dạng header

function Header() {
    return (
        <header className="header">
            <h1>My App</h1>
            <nav>
                <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/about">Giới thiệu</a></li>
                    <li><a href="/contact">Liên hệ</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
