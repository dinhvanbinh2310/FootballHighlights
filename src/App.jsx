// src/App.js
import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx'; // Trang Home hoặc các trang khác 
import Schedule from './components/Schedule.jsx'; // Trang Lịch Thi Đấu
import { AuthProvider } from "../src/AuthContext"; // Import context để quản lý trạng thái xác thực

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Schedule />
        <Footer />
      </AuthProvider>
    </div> 
  );
}

export default App;
