import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelProvider";
import HotelCard from "../HotelCard";
import Loader from "../Loader";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  const { inputValueHotel, setInputValueHotel } = useHotels();
  const findedHotel = data
    .map((item) => {
      if (item.name.includes(inputValueHotel)) {
        return item;
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);
  if (isLoading) return<Loader />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-10 gap-5 mx-auto z-0 justify-items-center">
      {findedHotel.map((item) => (
        <HotelCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default LocationList;
