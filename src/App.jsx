// src/App.js
import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx'; // Trang Home hoặc các trang khác 
import Schedule from './components/Schedule.jsx'; // Trang Lịch Thi Đấu
import { AuthProvider } from "../src/AuthContext"; // Import context để quản lý trạng thái xác thực
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import các thành phần từ react-router-dom
import DetailMatch from './components/DetailMatch.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Schedule />} /> {/* Route cho trang lịch thi đấu */}
            {/* Thêm các route khác tại đây nếu cần */}
            <Route path="/detailmatch" element={<DetailMatch />} />
            <Route path="/dashboard" element={<Schedule />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
