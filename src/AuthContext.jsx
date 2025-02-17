import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Tạo một context để quản lý trạng thái xác thực người dùng
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State lưu trữ thông tin người dùng
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading

    useEffect(() => {
        setLoading(true); // Bắt đầu tải dữ liệu
        axios.get("http://localhost:3000/auth/user", { withCredentials: true })
            .then(response => {
                console.log("User data fetched:", response.data); // Kiểm tra dữ liệu user
                setUser(response.data); // Cập nhật user
            })
            .catch(error => {
                console.error("Lỗi khi lấy thông tin user:", error);
                setUser(null); // Không có user, đặt về null
            })
            .finally(() => {
                setLoading(false); // Kết thúc tải
            });
    }, []);

    const logout = async () => {
        try {
            await axios.get("http://localhost:3000/logout", { withCredentials: true });
            setUser(null); // Cập nhật lại user sau khi đăng xuất
            console.log("Người dùng đã đăng xuất.");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
    