// src/App.js
import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx'; // Trang Home hoặc các trang khác 
import Schedule from './components/Schedule.jsx'; // Trang Lịch Thi Đấu

function App() {
  return (
    <div className="App">
      <Header />
      <Schedule />
      <Footer />
    </div>
  );
}

export default App;
