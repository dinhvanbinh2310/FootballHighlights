import React, { useContext, useEffect } from 'react';
import './styles/Header.css';
import { AuthContext } from "../AuthContext";

function Header() {
    const { user } = useContext(AuthContext);

    console.log("User data rin Header.js:", user); // 👈 Debug dữ liệu user nhận đượcr

    useEffect(() => {
        console.log("User Data:", user); // Kiểm tra dữ liệu user khi đăng nhập
    }, [user]);

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    const logout = () => {
        window.location.href = "http://localhost:3000/logout";
    };

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
            <div className="auth-buttons">
                {user ? (
                    <>
                        <span>Xin chào, {user.displayName}</span>
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Avatar" className="avatar" />
                        ) : (
                            <span>Không có avatar</span>
                        )}
                        <button onClick={logout}>Đăng xuất</button>
                    </>
                ) : (
                    <button onClick={loginWithGoogle}>Đăng nhập với Google</button>
                )}
            </div>
        </header>
    );
}

export default Header;
