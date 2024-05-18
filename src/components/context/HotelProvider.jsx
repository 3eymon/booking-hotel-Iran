import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext = createContext();

function HotelProvider({ children }) {
  const [inputValueHotel, setInputValueHotel] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${city !== "undefined" ? city : ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelContext.Provider value={{ hotels, isLoading, city , inputValueHotel, setInputValueHotel }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
