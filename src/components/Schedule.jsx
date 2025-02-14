import React from "react";
import { Card, CardContent, Table, TableHead, TableRow, TableCell } from "@mui/material";
import MatchList from "./MatchList"; // Đảm bảo đường dẫn đúng

const SchedulePage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lịch Thi Đấu</h1>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ngày</TableCell>
                                <TableCell>Giờ</TableCell>
                                <TableCell>Đội 1</TableCell>
                                <TableCell>Đội 2</TableCell>
                                <TableCell>Địa điểm</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* Chèn component MatchList để hiển thị TableBody */}
                        <MatchList />
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SchedulePage;
