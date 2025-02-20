import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DetailMatch = () => {
    const location = useLocation();
    const { match } = location.state || {};
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/'); // Đường dẫn về trang Schedule
    };
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
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1>Chi tiết trận đấu</h1>
                <button onClick={handleBackClick} style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}>
                    Trở lại
                </button>
            </div>
            <div className="centered-content">
                <h2>{homeTeam.name}<img src={homeTeam.logo} alt={homeTeam.name} style={{ width: '50px', height: '50px' }} /> vs {awayTeam.name}<img src={awayTeam.logo} alt={awayTeam.name} style={{ width: '50px', height: '50px' }} /></h2>
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
                <img src={league.logo} alt={league.name} style={{ width: '50px', height: '50px' }} />
            </div>
        </>

    );
};

export default DetailMatch;