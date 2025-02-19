import React, { useState, useEffect, useContext } from "react";
import { Table, TableBody, TableRow, TableCell, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";


const MatchesTable = ({ matches, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Tính tổng số trang
    const totalPages = Math.ceil(matches.length / itemsPerPage);
    const paginatedMatches = matches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handleDetailClick = async (matchId) => {
        try {
            // Gửi yêu cầu GET đến API
            const response = await axios.get(`http://localhost:3000/api/matches/${matchId}`);

            // Lấy dữ liệu từ phản hồi
            const data = response.data;

            // Xử lý dữ liệu
            console.log('Match Data:', data);
            navigate('/detailmatch', { state: { match: data[0] } });
        } catch (error) {
            // Xử lý lỗi
            console.error('Error fetching match data:', error.message);
        }
    };



    return (
        <TableBody>
            {paginatedMatches.map((match, index) => (
                <TableRow key={index}>
                    <TableCell>
                        {new Date(match.date).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </TableCell>
                    <TableCell>{match.round}</TableCell>
                    <TableCell>
                        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="team-logo" />
                    </TableCell>
                    <TableCell>{match.homeTeam.name}</TableCell>
                    <TableCell>{match.awayTeam.name}</TableCell>
                    <TableCell>
                        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="team-logo w-10 h-10" />
                    </TableCell>
                    <TableCell>{match.league.name} <img src={match.league.logo} className="team-logo w-10 h-10" /></TableCell>
                    <TableCell>
                        <button
                            onClick={() => handleDetailClick(match.id)}
                            className="detail-button"
                        >
                            Chi tiết
                        </button>
                    </TableCell>
                </TableRow>
            ))}
            {/* Nút điều hướng phân trang */}
            <div className="pagination-controls">
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Trang trước
                </Button>
                <span>Trang {currentPage} / {totalPages}</span>
                <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Trang sau
                </Button>
            </div>
        </TableBody>

    );
};
export default MatchesTable;