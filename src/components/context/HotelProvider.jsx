import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext = createContext();

function HotelProvider({ children }) {
  const [inputValueHotel, setInputValueHotel] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch();
  let hotels = [];
  if (data) {
    const filterCity = data.map((e) => {
      if (e.name.includes(city)) {
        return e;
      }
    });
    hotels = filterCity
      .filter((e) => e !== undefined)
      .filter((e) => e.accommodates > room);
  }
  return (
    <HotelContext.Provider
      value={{ hotels, isLoading, city, inputValueHotel, setInputValueHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
