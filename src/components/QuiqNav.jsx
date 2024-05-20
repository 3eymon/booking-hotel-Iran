import { HeartIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useFavoriteList } from "./context/FavoriteProvider";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export default function QuiqNav({ bgFade, setOnOpen, onOpen }) {
  const { favoriteList } = useFavoriteList();
  const hanleChangeTheme = () => {
    const root = window.document.documentElement;
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };
  if (!onOpen) {
    bgFade.current?.classList.remove("!visible");
    bgFade.current?.classList.remove("opacity-100");
  }
  const hanleShowModal = () => {
    setOnOpen(true);
    bgFade.current.addEventListener("click", () => {
      setOnOpen(false);
      bgFade.current.classList.remove("!visible");
      bgFade.current.classList.remove("opacity-100");
    });

    bgFade.current.classList.add("!visible");
    bgFade.current.classList.add("opacity-100");
  };
  useEffect(() => {
    const root = window.document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }, []);
  return (
    <div
      className={`fixed bottom-0 md:left-1/2 md:ml-[-180px] w-full md:w-auto dark:bg-gray-800/30 bg-gray-500/30 backdrop-blur px-7 py-3 md:rounded-t-xl  flex gap-3 z-[999] justify-around animate-fade-up transition-all ease-linear`}
    >
      <button
        onClick={hanleShowModal}
        className="bg-white text-red-500  px-2 py-2 rounded-full flex items-center gap-1 active:scale-95 relative"
      >
        <HeartIcon className="w-6" />
        <span className=" absolute -top-1 -right-2 bg-red-600 w-5 h-5 [padding:_1px_5.5px;]  rounded-full  text-white text-sm">
          {favoriteList.length}
        </span>
      </button>
      <button
        className="bg-white text-gray-500  p-2 rounded-full flex items-center gap-1 active:scale-95"
        onClick={hanleChangeTheme}
      >
        <MoonIcon className="w-6  block dark:hidden animate-flip-down" />
        <SunIcon className="w-6  hidden dark:block animate-flip-up" />
      </button>
      <User />
    </div>
  );
}

function User() {
  const { isAuthenticated, LogOut } = useAuth();
  if (isAuthenticated)
    return (
      <div className="flex gap-3">
        <Link
          to="/profile"
          className="bg-gray-500 text-white p-2 rounded-full z-[1000] active:scale-95"
        >
          <UserIcon className="text-white w-6" />
        </Link>
        <button
          onClick={LogOut}
          className="bg-white p-2 rounded-full z-[1000] active:scale-95"
        >
          <ArrowLeftStartOnRectangleIcon className="text-red-500 w-6 " />
        </button>
      </div>
    );
  return (
    <Link
      to="/login"
      className="bg-black text-white px-5 py-2 rounded-full z-[1000] active:scale-95"
    >
      ورود و یا عضویت
    </Link>
  );
}
