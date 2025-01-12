import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelProvider";
import HotelCard from "../HotelCard";
import Loader from "../Loader";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

function LocationList() {
  const { data, isLoading, totalPages, totalHotels } = useFetch();
  const { inputValueHotel, setInputValueHotel } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParamPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (event, page) => {
    setSearchParams({ page });
  };

  const findedHotel = data
    .map((item) => {
      if (item.name.includes(inputValueHotel)) {
        return item;
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);

  if (isLoading) return <Loader />;

  return (
    <>
      <div
        className={`relative w-full px-5 sm:px-0 ${inputValueHotel.length > 0 ? "max-h-0" : "max-h-[30vh] sm:max-h-[50vh]"
          } overflow-hidden rounded-2xl transition-all ease-linear`}
      >
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/a2/50/16/ghasr-monshi-hotel.jpg?w=1200&h=-1&s=1"
          className="w-full max-h-[30vh] sm:max-h-[50vh] rounded-2xl object-cover aspect-video my-10 brightness-50"
          alt="ایران هتل"
        />
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold animate-fade-up">
            ایران هتل | مرجع رزرو هتل
          </h1>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-3xl font-semibold mb-2 mr-2">هتل ها ({totalHotels})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mx-auto z-0 justify-items-center">
          {findedHotel.map((item) => (
            <HotelCard key={item.id} item={item} />
          ))}
        </div>
        {/* Pagination */}
        <Stack spacing={2} alignItems="center" className="mt-5">
          <Pagination
            count={totalPages}
            page={currentParamPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            dir="ltr"
          />
        </Stack>
      </div>
    </>
  );
}

export default LocationList;
