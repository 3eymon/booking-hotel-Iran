import { HeartIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useFavoriteList } from "./context/FavoriteProvider";

export default function QuiqNav({ bgFade, setOnOpen, onOpen }) {
  const { favoriteList } = useFavoriteList();
  const hanleChaneTheme = () => {
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
    <div className="fixed bottom-0 md:left-1/2 md:ml-[-180px] w-full md:w-auto dark:bg-gray-800/30 bg-gray-500/30 backdrop-blur px-7 py-3 md:rounded-t-xl  flex gap-3 z-[999] justify-around">
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
        className="bg-white text-gray-500  px-2 py-2 rounded-full flex items-center gap-1 active:scale-95"
        onClick={hanleChaneTheme}
      >
        <MoonIcon className="w-6  block dark:hidden animate-flip-down" />
        <SunIcon className="w-6  hidden dark:block animate-flip-up" />
      </button>
      <button className="bg-white text-black px-5 py-1 rounded-full z-[1000] active:scale-95 ">
        ثبت نام
      </button>
      <button className="  bg-black text-white px-5 py-1 rounded-full z-[1000] active:scale-95">
        ورود
      </button>
    </div>
  );
}
