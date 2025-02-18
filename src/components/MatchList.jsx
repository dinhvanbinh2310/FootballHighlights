import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import { TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import MatchesTable from "./MatchesTable";

const MatchList = ({ matches, error, loading }) => {
    const { user } = useContext(AuthContext);


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
        <MatchesTable matches={matches} />
    );
};

export default MatchList;
