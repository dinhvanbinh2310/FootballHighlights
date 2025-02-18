import React from "react";
import { Card, CardContent, Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import MatchList from "./MatchList"; // Đảm bảo đường dẫn đúng
import { useState, useEffect } from "react";
import axios from "axios";


const SchedulePage = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/matches', { withCredentials: true });
                setMatches(response.data);
                setLoading(false);
            } catch (err) {
                setError('Lỗi khi lấy danh sách trận đấu');
                setLoading(false);
            }
        };

        fetchMatches();
    });
    // Trạng thái để lưu trữ lựa chọn giải đấu
    const [selectedLeague, setSelectedLeague] = useState("");
    const leagues = [...new Set(matches.map(match => match.league.name))];
    // Hàm để lọc trận đấu theo giải đấu
    const filteredMatches = matches.filter(
        match => match.league.name === selectedLeague
    );
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Tiêu đề trang */}
            <Typography variant="h4" className="text-center font-bold text-blue-600 mb-6">
                Lịch Thi Đấu Mới Nhất
            </Typography>
            {/* Dropdown chọn giải đấu */}
            <select
                onChange={(e) => setSelectedLeague(e.target.value)}
                value={selectedLeague}
            >
                <option value="">Chọn giải đấu</option>
                {leagues.map((league, index) => (
                    <option key={index} value={league}>
                        {league}
                    </option>
                ))}
            </select>
            <Card className="shadow-lg rounded-xl border border-gray-200">
                <CardContent className="bg-gray-100">
                    <Table className="border rounded-lg overflow-hidden">
                        {/* Tiêu đề cột với thiết kế nổi bật */}
                        <TableHead>
                            <TableRow className="bg-blue-500 text-white">
                                <TableCell className="text-white font-bold text-lg">Ngày</TableCell>
                                <TableCell className="text-white font-bold text-lg">Mùa giải</TableCell>
                                <TableCell className="text-white font-bold text-lg"></TableCell>
                                <TableCell className="text-white font-bold text-lg">Đội nhà</TableCell>
                                <TableCell className="text-white font-bold text-lg">Đội khách</TableCell>
                                <TableCell className="text-white font-bold text-lg"></TableCell>
                                <TableCell className="text-white font-bold text-lg">Giải đấu</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Dữ liệu trận đấu */}
                        <MatchList matches={filteredMatches} error={error} loading={loading} />

                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SchedulePage;
