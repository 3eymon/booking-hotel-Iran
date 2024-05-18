import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useHotels } from "../context/HotelProvider";
import HotelCard from "../HotelCard";
function Hotels() {
  const { hotels, isLoading, city, inputValueHotel } = useHotels();
  const findedHotel = hotels
    .map((item) => {
      if (item.name.includes(inputValueHotel)) {
        return item;
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);
  if (isLoading) return <p className="dark:text-white">لطفا شکیبا باشید ...</p>;
  return (
    <div>
      {findedHotel.length > 0 ? (
        <div>
          <h1 className="text-lg dark:text-white">هتل های پیدا شده در {city}</h1>
          <p className="text-xs text-gray-400">
            ما <span className="text-black px-0.5 dark:text-white">{hotels.length}</span> هتل
            برای شما پیدا کردیم
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 justify-items-center">
            {findedHotel.map((item) => (
              <HotelCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg flex t">
          با این مشخصات هتلی پیدا نشد <FaceFrownIcon className="w-6" />
        </p>
      )}
    </div>
  );
}

export default Hotels;
