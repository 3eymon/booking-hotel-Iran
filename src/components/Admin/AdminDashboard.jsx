import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // گرفتن صفحه جاری از searchParams
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // گرفتن اطلاعات هتل‌ها
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/hotels?page=${currentPage}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}` },
          }
        );

        const { hotels, totalPages } = response.data;
        console.log(hotels);

        setHotels(hotels);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [currentPage]);

  // هندل تغییر صفحه
  const handlePageChange = (event, page) => {
    setSearchParams({ page });
  };

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Box className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">داشبورد ادمین</h1>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          className="!mx-2 !font-Peyda"
          onClick={() => console.log(`Deleting hotel`)}
        >
          اضافه کردن هتل جدید
        </Button>
      </Box>

      <TableContainer component={Paper} className="!font-Peyda">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="!font-Peyda">تصویر</TableCell>
              <TableCell className="!font-Peyda">نام هتل</TableCell>
              <TableCell className="!font-Peyda">آدرس</TableCell>
              <TableCell className="!font-Peyda">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.id} >
                <TableCell>
                  <img
                    loading="lazy"

                    src={hotel.thumbnail_url}
                    alt={hotel.name}
                    className="w-28 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="!font-Peyda">{hotel.name}</TableCell>
                <TableCell className="!font-Peyda">{hotel.address}</TableCell>
                <TableCell className="flex gap-3">
                  <Button
                    variant="contained"
                    color="inherit"
                    className="!mx-2 !font-Peyda"
                    onClick={() => console.log(`Deleting hotel ${hotel.id}`)}
                  >
                    ادیت
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    className="!mx-2 !font-Peyda"
                    onClick={() => console.log(`Deleting hotel ${hotel.id}`)}
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
