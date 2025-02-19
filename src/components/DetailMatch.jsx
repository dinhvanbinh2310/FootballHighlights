import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailMatch = () => {
    const location = useLocation();
    const { match } = location.state || {};
    console.log('mang ne Match Data:', match);

    // Kiểm tra nếu không có dữ liệu
    if (!match) {
        return <div>Không có dữ liệu trận đấu.</div>;
    }

    // Truy cập các thuộc tính
    const {
        venue,
        referee,
        forecast,
        date,
        country,
        state,
        homeTeam,
        awayTeam,
        league,
    } = match;

    // Hiển thị dữ liệu
    return (
        <div>
            <h1>Chi tiết trận đấu</h1>
            <h2>{homeTeam.name} vs {awayTeam.name}</h2>
            <p>Ngày: {new Date(date).toLocaleDateString()}</p>
            <p>Giờ: {new Date(date).toLocaleTimeString()}</p>
            <p>Địa điểm: {venue.name}, {venue.city}, {venue.country}</p>
            <p>Sức chứa: {venue.capacity}</p>
            <p>Trọng tài: {referee.name} ({referee.nationality})</p>
            <p>Thời tiết: {forecast.status}, {forecast.temperature}</p>
            <p>Quốc gia: {country.name}</p>
            <p>Trạng thái: {state.description}</p>
            <p>Thời gian: {state.clock} phút</p>
            <p>Tỉ số: {state.score.current}</p>
            <p>Giải đấu: {league.name} (Mùa giải {league.season})</p>
            <img src={homeTeam.logo} alt={homeTeam.name} style={{ width: '50px', height: '50px' }} />
            <img src={awayTeam.logo} alt={awayTeam.name} style={{ width: '50px', height: '50px' }} />
            <img src={league.logo} alt={league.name} style={{ width: '50px', height: '50px' }} />
        </div>
    );
};

export default DetailMatch;