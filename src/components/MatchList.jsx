import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import { TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const MatchList = () => {
    const { user } = useContext(AuthContext);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return; // Chỉ gọi API nếu đã đăng nhập

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
    }, [user]);

    if (!user) {
        return <p>Vui lòng đăng nhập để xem trận đấu.</p>;
    }

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
                    <TableCell>
                        <img src={match.homeLogo} alt={match.homeTeam} className="team-logo" />
                    </TableCell>
                    <TableCell>{match.homeTeam.name}</TableCell>
                    <TableCell>{match.awayTeam.name}</TableCell>
                    <TableCell>
                        <img src={match.awayLogo} alt={match.awayTeam} className="team-logo" />
                    </TableCell>
                    <TableCell>{match.league.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MatchList;
