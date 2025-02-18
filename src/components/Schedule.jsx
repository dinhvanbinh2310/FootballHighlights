import React from "react";
import { Card, CardContent, Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import MatchList from "./MatchList"; // Đảm bảo đường dẫn đúng

const SchedulePage = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Tiêu đề trang */}
            <Typography variant="h4" className="text-center font-bold text-blue-600 mb-6">
                Lịch Thi Đấu Mới Nhất
            </Typography>

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
                                <TableCell className="text-white font-bold text-lg">Địa điểm</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Dữ liệu trận đấu */}
                        <MatchList />
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SchedulePage;
