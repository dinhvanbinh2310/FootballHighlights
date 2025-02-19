import React, { useContext, useEffect } from "react";
import { Button, Avatar } from "@mui/material";
import { AuthContext } from "../AuthContext";
import "./styles/Header.css";

function Header() {

    const { user } = useContext(AuthContext);

    console.log("User data in Header.js:", user); // Debug dữ liệu user nhận được

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
            <h1>TwoFootball</h1>
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
                        <span className="welcome-text">Xin chào, {user.displayName}</span>
                        {user.photoURL ? (
                            <Avatar src={user.photoURL} alt="Avatar" className="avatar" />
                        ) : (
                            <Avatar className="avatar">U</Avatar> // Avatar mặc định nếu không có ảnh
                        )}
                        <Button
                            variant="contained"
                            color="error"
                            className="auth-button"
                            onClick={logout}
                        >
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        className="auth-button"
                        onClick={loginWithGoogle}
                    >
                        Đăng nhập với Google
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;
