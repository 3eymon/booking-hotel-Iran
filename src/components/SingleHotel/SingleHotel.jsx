import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { MapPinIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import LoaderS from "./LoaderS";
import { useFavoriteList } from "../context/FavoriteProvider";
function SingleHotel() {
  const { id } = useParams();
  const { data: hotel, isLoading } = useFetch(
    `http://localhost:5000/hotels/${id}`
  );
  const { favoriteList, setFavoriteList } = useFavoriteList();
  const isFav = hotel
    ? favoriteList.map((f) => f.id).includes(hotel.id)
    : false;
  if (isLoading) return <LoaderS />;
  return (
    <div className="w-full mt-10 flex flex-col lg:flex-row  gap-2.5 dark:text-white">
      <div>
        <img
          src={hotel.large_url}
          className="w-[35rem] h-[20rem] object-cover rounded-xl"
          alt={`عکس عکس زیبای ${hotel.name}`}
        />
        <h1 className=" font-PeydaBlack text-2xl py-3">{hotel.name}</h1>
        <p className="max-w-[35rem] text-sm text-gray-700 dark:text-gray-300">
          {hotel.description}
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-xl  font-semibold flex gap-2">
            <PlusCircleIcon className="w-4" />
            امکانات{" "}
          </h2>
          <div className="hotel-facilities_wrapper__BVMON mt-5">
            <div>
              <div className="px-3 fs-7 lh-2 tw-mb-2 ">
                {hotel.amenities?.map((a, index) => (
                  <li key={index}>{a}</li>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl  font-semibold flex gap-2">
            <MapPinIcon className="w-4" />
            آدرس سر راست{" "}
          </h2>
          <p className="text-gray-900 dark:text-gray-400 pr-3 py-4">
            {hotel.address}
          </p>
        </div>
        {isFav ? (
          <p className="mx-auto animate-fade-up">در لیست علاقه مندی هاست</p>
        ) : (
          <button
            onClick={() => setFavoriteList((prev) => [...prev, hotel])}
            className="bg-red-400 animate-fade-up hover:bg-red-300 text-white mx-auto px-5 py-2 rounded-full transition-all active:scale-95 ease-in-out"
          >
            اضافه کردن به لیست علاقه مندی ها
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleHotel;
