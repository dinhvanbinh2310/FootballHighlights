// highlightly.js

// Cài đặt axios trước bằng: npm install axios
require("dotenv").config();
const axios = require('axios');
const express = require('express');
const session = require("express-session"); // Middleware quản lý session
const passport = require("./passport"); // Cấu hình xác thực với Passport.js
const cors = require('cors');

const app = express();
const port = 3000;


// Cấu hình session cho Express
app.use(cors({
    origin: "http://localhost:5173",  // Chỉ cho phép frontend này
    credentials: true                  // Cho phép gửi cookie & header xác thực
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "my_secret_key",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // Khởi tạo Passport middleware
app.use(passport.session()); // Passport sử dụng session

// API gửi dữ liệu user sau khi đăng nhập
app.post("/send-user-data", (req, res) => {
    if (!req.user) {
        return res.status(401).send("Lỗi xác thực: Không có user");
    }

    axios
        .post("https://your-api.com/user-data", {
            name: req.user.displayName, // Lấy tên từ Google
            email: req.user.emails[0].value, // Lấy email từ Google
            photoURL: req.user.photos[0].value, // Ảnh từ Google
        })
        .then((response) => res.json(response.data.data)) // Trả về dữ liệu từ API
        .catch((error) => res.status(500).send(error.message)); // Xử lý lỗi
});


// Cấu hình API
// Thay YOUR_RAPIDAPI_KEY bằng API Key mà bạn nhận được từ RapidAPI
const RAPIDAPI_KEY = '789995d4-6f2e-4cc8-991f-93c200dcfd2d';
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

//  GET API google
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route callback sau khi Google xác thực
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).send("Lỗi xác thực: Không có user");
        }

        // ✅ Sau khi xác thực thành công, chuyển hướng về frontend kèm user info
        res.redirect(`http://localhost:5173/dashboard?name=${encodeURIComponent(req.user.displayName)}&email=${encodeURIComponent(req.user.emails[0].value)}`);
    }
);

//Thêm API để lấy thông tin người dùng sau khi đăng nhập
app.get("/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Chưa đăng nhập" });
    }
});

//API đăng xuất
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return res.status(500).send("Lỗi đăng xuất"); }
        res.redirect("http://localhost:5173"); // Quay về frontend sau khi đăng xuất
    });
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

        const response = await apiClient.get('/matches', { params: { date, leagueId, limit: 100, offset: 0 } });
        response.data.data.forEach(match => matches.push(match));
        res.json(matches);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trận đấu:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách trận đấu' });
    }
});
app.get('/api/matches/:id', async (req, res) => {
    try {
        const matchId = req.params.id;
        console.log('Fetching match details for ID:', matchId);

        const response = await apiClient.get(`/matches/${matchId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết trận đấu:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Lỗi khi lấy chi tiết trận đấu' });
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
})

app.listen(port, () => {
    console.log(`Server đang chạy trên cổng http://localhost:${port}`);
});
