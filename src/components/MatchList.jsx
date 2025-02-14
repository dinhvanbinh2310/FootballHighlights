import React, { useState, useEffect } from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";



const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Gọi API với query parameters
                const response = await axios.get('http://localhost:5000/api/matches');
                // Giả sử API trả về dữ liệu ở response.data.data
                setMatches(response.data.data);
                console.log('Response data:', setMatches);
                setLoading(false);
            } catch (err) {
                setError('Lỗi khi lấy danh sách trận đấu');
                setLoading(false);
                console.error('Lỗi:', err);
            }
        };

        fetchMatches();
    }, []);

    if (loading) {
        return <TableBody><TableRow><TableCell colSpan={5}>Đang tải...</TableCell></TableRow></TableBody>;
    }

    if (error) {
        return <TableBody><TableRow><TableCell colSpan={5}>{error}</TableCell></TableRow></TableBody>;
    }

    return (
        <TableBody>
            {matches.map((match, index) => (
                <TableRow key={index}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>{match.round}</TableCell>
                    <TableCell>{match.homeTeam.name}</TableCell>
                    <TableCell>{match.awayTeam.name}</TableCell>
                    <TableCell>{match.league.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MatchList;
