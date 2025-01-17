import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../backendless";
import db from "../data.js";
export default function useFetch(id, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // دریافت پارامتر صفحه از URL
        const page = parseInt(searchParams.get("page") || "1", 10);

        // const { data } = await api.get(`/hotels/${page}`);
        // const hotels = data.hotels;
        const hotels = db;

        setTotalPages(data.totalPages);
        setTotalHotels(data.totalHotels);

        if (id) {
          setData(hotels.filter((e) => e.id === id)[0]);
        } else {
          setData(hotels);
        }
      } catch (err) {
        setData([]);
        toast.error(err?.message || "خطایی رخ داد");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, query, searchParams]); // تغییر searchParams باعث بارگذاری مجدد داده‌ها می‌شود

  // تابع تغییر صفحه
  const handlePageChange = (page) => {
    setSearchParams({ page }); // تغییر پارامتر صفحه در URL
  };

  return {
    data,
    isLoading,
    totalPages,
    handlePageChange,
    totalHotels,
  };
}
