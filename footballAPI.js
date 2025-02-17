// highlightly.js

// Cài đặt axios trước bằng: npm install axios
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Cho phép gọi API từ frontend
app.use(express.json()); // Hỗ trợ xử lý JSON trong request

// Cấu hình API
// Thay YOUR_RAPIDAPI_KEY bằng API Key mà bạn nhận được từ RapidAPI
const RAPIDAPI_KEY = '32ad4109-659e-417e-a70f-53593f27db15';
const RAPIDAPI_HOST = 'https://soccer.highlightly.net';

const matches = [
    { date: "2025-02-20", time: "19:00", team1: "Team A", team2: "Team B", location: "Stadium 1" },
    { date: "2025-02-21", time: "18:30", team1: "Team C", team2: "Team D", location: "Stadium 2" },
    { date: "2025-02-22", time: "20:00", team1: "Team E", team2: "Team F", location: "Stadium 3" },
];

const apiClient = axios.create({
    baseURL: RAPIDAPI_HOST,
    headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
    },
});

// API routes
app.get('/', (req, res) => {
    res.send('Server đang chạy! Hãy thử gọi API ở /api/matches/today');
});

app.get('/api/countries', async (req, res) => {
    try {
        const data = await apiClient.get('/countries');
        res.json(data.data);
    } catch (error) {
        console.error('Lỗi chi tiết:', error); // In ra lỗi chi tiết
        res.status(500).json({ error: 'Lỗi khi lấy danh sách quốc gia' });
    }
});

app.get('/api/leagues', async (req, res) => {
    try {
        const { countryCode, season } = req.query;
        const data = await apiClient.get('/leagues', { params: { countryCode, season } });
        res.json(data.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách giải đấu' });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const { name } = req.query;
        const data = await apiClient.get('/teams', { params: { name } });
        res.json(data.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách đội bóng' });
    }
});

app.get('/api/matches', async (req, res) => {
    try {
        // Nếu không truyền date, mặc định lấy ngày hôm nay
        const date = req.query.date || new Date().toISOString().split('T')[0];
        const leagueId = req.query.leagueId; // Nếu cần, cũng có thể thiết lập giá trị mặc định
        console.log('Query parameters:', { date, leagueId });
        // Xoá dữ liệu cũ
        matches.length = 0;

        const response = await apiClient.get('/matches', { params: { date, leagueId, limit: 10, offset: 0 } });
        response.data.data.forEach(match => matches.push(match));

        res.json(matches);
        console.log('Danh sách trận đấu:', matches);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trận đấu:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách trận đấu' });
    }
});


app.get('/api/highlights', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại (YYYY-MM-DD)
        // Lấy các tham số từ query string của client
        // Các tham số chính: ví dụ "date" (bắt buộc một tham số chính phải có)
        // Các tham số phụ: timezone, type, limit, offset
        const { date = today, timezone, type, limit = 10, offset = 0 } = req.query;

        // Nếu không truyền "date", mặc định sử dụng ngày hiện tại (định dạng YYYY-MM-DD)
        const queryDate = date || new Date().toISOString().split('T')[0];

        // Xây dựng đối tượng params gửi lên API
        const params = { date: queryDate };
        if (timezone) params.timezone = timezone;
        if (type) params.type = type;     // Ví dụ: VERIFIED hoặc UNVERIFIED
        if (limit) params.limit = limit;
        if (offset) params.offset = offset;

        // Gọi API highlights của RapidAPI
        const response = await apiClient.get('/highlights', { params });

        // Trả dữ liệu về client (dữ liệu thường nằm trong response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Lỗi khi lấy highlights:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Lỗi khi lấy highlights' });
    }
});

// Lấy danh sách trận đấu hôm nay và nhóm theo giải đấu
app.get('/api/matches/today', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại (YYYY-MM-DD)
        const response = await apiClient.get('/matches', { params: { date: today, leagueId: 104 } });

        // Nhóm trận đấu theo giải đấu
        const groupedMatches = {};
        response.data.data.forEach(match => {
            const leagueName = match.league.name;
            if (!groupedMatches[leagueName]) {
                groupedMatches[leagueName] = [];
            }
            groupedMatches[leagueName].push(match);
        });

        res.json(groupedMatches);
    } catch (error) {
        console.error('Lỗi lấy danh sách trận đấu:', error);
        res.status(500).json({ error: 'Lỗi lấy dữ liệu' });
    }
});

// Chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});