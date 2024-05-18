import { useFavoriteList } from "./context/FavoriteProvider";
import { TrashIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Modal({ onOpen, setOnOpen }) {
  if (onOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const { favoriteList, setFavoriteList } = useFavoriteList();
  return (
    <div
      dir="ltr"
      className={`fixed ${
        onOpen ? "block" : "hidden"
      } cus-scroll h-full sm:min-h-80 sm:max-h-[29rem] z-[100000] w-full sm:w-[30rem] dark:text-white bg-white dark:bg-gray-800 top-1/2 left-1/2 overflow-y-auto -translate-x-1/2 -translate-y-1/2 sm:rounded-lg`}
    >
      <div
        className="flex justify-between w-full py-5 items-center dark:text-white "
        dir="rtl"
      >
        <div className="flex items-center">
          <img src="/favorite.webp" className="w-9 mx-2 " alt="" />
          <h2>لیست علاقه مندی ها</h2>
        </div>
        <XMarkIcon className="w-8 ml-8" onClick={() => setOnOpen(false)} />
      </div>
      <button
        onClick={() => setFavoriteList([])}
        className="pl-6 text-red-500 flex items-center gap-2"
      >
        <WalletIcon className="w-4" />
        پاک کردن همه{" "}
      </button>
      <ul className="flex flex-col  p-4" dir="rtl">
        {favoriteList.length > 0
          ? favoriteList.map((f) => (
              <li className="border-gray-400 flex flex-row mb-2 " key={f.id}>
                <div className="select-none bg-gray-200 dark:bg-gray-700 rounded-md flex flex-1 items-center p-4 ">
                  <Link to={`/hotels/${f.id}`} onClick={() => setOnOpen(false)}>
                    <img
                      src={f.medium_url}
                      loading="lazy"
                      className="flex flex-col rounded-md w-28 h-20 bg-gray-300  dark:bg-gray-500 justify-center items-center ml-4 animate-fade"
                    />
                  </Link>
                  <div className="flex-1 pr-1 ml-16">
                    <div className="font-medium ">
                      <Link
                        to={`/hotels/${f.id}`}
                        onClick={() => setOnOpen(false)}
                      >
                        {f.name}
                      </Link>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1">
                      {f.description}
                    </div>
                  </div>
                  <button
                    className="text-gray-600 text-xs"
                    onClick={() =>
                      setFavoriteList(
                        favoriteList.filter((fa) => fa.id !== f.id)
                      )
                    }
                  >
                    <TrashIcon className="w-5 text-red-500" />
                  </button>
                </div>
              </li>
            ))
          : undefined}
      </ul>
    </div>
  );
}
