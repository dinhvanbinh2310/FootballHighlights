import React, { useState, useEffect, useContext } from "react";
import { Table, TableBody, TableRow, TableCell, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const MatchesTable = ({ matches, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính tổng số trang
    const totalPages = Math.ceil(matches.length / itemsPerPage);
    const paginatedMatches = matches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <TableBody>
            {paginatedMatches.map((match, index) => (
                <TableRow key={index}>
                    <TableCell>{match.date}</TableCell>
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