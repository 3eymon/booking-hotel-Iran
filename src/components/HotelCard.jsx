import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useFavoriteList } from "./context/FavoriteProvider";
import toast from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function HotelCard({ item }) {
  const { favoriteList, setFavoriteList } = useFavoriteList();
  const isFav = item ? favoriteList.map((f) => f.id).includes(item.id) : false;
  const hanleAddToFavorite = (item) => {
    setFavoriteList((prev) => [...prev, item]);
    toast.success("لایک شد ! ");
  };
  const hanleRemoveInFavorite = (item) => {
    setFavoriteList(favoriteList.filter((c) => c.id !== item.id));
    toast.success("لایک  حذف شد ! ");
  };
  return (
    <div className="md:w-56 w-full px-5 md:px-0">
      <div className="relative rounded-2xl overflow-hidden">
        <Link
          to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
        >
          <img
            src={item.medium_url}
            loading="lazy"
            alt={`عکس_${item.name}`}
            className="object-cover h-44 bg-gray-300 animate-fade w-full"
          />
        </Link>
        <button
          className="bg-white absolute top-3 right-3 p-1 rounded-full shadow"
          onClick={() =>
            isFav ? hanleRemoveInFavorite(item) : hanleAddToFavorite(item)
          }
        >
          <HeartIcon
            className={`w-5 transition-all ease-linear  ${
              isFav ? "fill-red-500 stroke-red-500" : ""
            } `}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2.5 pt-2">
        <Link
          className="font-Peyda font-black text-sm dark:text-white dark:font-PeydaLight"
          to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
        >
          {item.name}
        </Link>
        <p className="text-gray-400 dark:text-gray-300 text-xs line-clamp-2">
          {item.description}
        </p>
        <div className="text-gray-400 dark:text-gray-300 text-xs flex justify-between px-1">
          <p>
            شبی
            <span className="text-black dark:text-white">
              {(item.price * 18000).toLocaleString()}
            </span>
          </p>
          <div className="flex">
            {" "}
            ({item.number_of_reviews} نظر)
            <StarIcon className="w-4 text-yellow-400" />
            <StarIcon className="w-4 text-yellow-400" />
            <StarIcon className="w-4 text-yellow-400" />
            <StarIcon className="w-4 text-yellow-400" />
            <StarIcon className="w-4 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
