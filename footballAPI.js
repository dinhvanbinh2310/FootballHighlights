// highlightly.js

// Cài đặt axios trước bằng: npm install axios
const axios = require('axios');
const port = 3000;

// Cấu hình API
// Thay YOUR_RAPIDAPI_KEY bằng API Key mà bạn nhận được từ RapidAPI
const RAPIDAPI_KEY = '2c398aa8-92a5-4713-8f5e-554999597f8e';
const RAPIDAPI_HOST = 'https://soccer.highlightly.net';

// Tạo instance axios với base URL và headers mặc định
const apiClient = axios.create({
    baseURL: 'https://soccer.highlightly.net',
    headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
    },
});

// Hàm lấy danh sách quốc gia
async function getCountries(name = '') {
    try {
        const params = name ? { name } : {};
        const response = await apiClient.get('/countries', { params });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách quốc gia:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm lấy danh sách giải đấu
async function getLeagues(query = {}) {
    try {
        const response = await apiClient.get('/leagues', { params: query });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách giải đấu:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm lấy danh sách đội bóng
async function getTeams(query = {}) {
    try {
        const response = await apiClient.get('/teams', { params: query });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đội bóng:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm lấy danh sách trận đấu
async function getMatches(query = {}) {
    try {
        const response = await apiClient.get('/matches', { params: query });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trận đấu:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Hàm lấy danh sách highlights
async function getHighlights(query = {}) {
    try {
        const response = await apiClient.get('/highlights', { params: query });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách highlights:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Xuất các hàm để có thể sử dụng lại trong module khác nếu cần
module.exports = {
    getCountries,
    getLeagues,
    getTeams,
    getMatches,
    getHighlights,
};
