import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const root = window.document.documentElement;
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.add("light");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { Login, isAuthenticated } = useAuth();
  const hanleSubmite = (e) => {
    e.preventDefault();
    if (email && password) Login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <div className="h-screen flex font-PeydaLight flex-row-reverse transition-all ease-in-out">
      <Link
        to="/"
        className="absolute text-left text-blue-500 bg-white px-3 py-2 flex items-center justify-end gap-3 z-[50] left-5 top-3 font-Peyda rounded-full"
      >
        <span>برگشت به صفحه اصلی</span>
        <ArrowLeftIcon className="w-4 pt-1" />
      </Link>
      <img src="/architecture.webp" className="relative animate-fade animate-duration-1000 overflow-hidden md:flex w-1/2 bg-cover bg-no-repeat bg-center i justify-around items-center hidden object-cover" alt="ایرانی " />

      <div className="flex w-full md:w-1/2 justify-center py-10 items-center bg-white dark:bg-transparent">
        <form className="bg-white dark:bg-transparent" onSubmit={hanleSubmite}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1 dark:text-white">
            سلامی مجدد !
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7 dark:text-gray-300">
            برای شروع کار ایمیلتو میزنی لطفا :)
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 animate-fade-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="pr-2 outline-none border-none dark:bg-transparent dark:text-white auto animate-fade-left"
              type="email"
              name="email"
              placeholder="آدرس ایمیل"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl animate-fade-left">
            <LockClosedIcon className="h-5 w-5 text-gray-400" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="pr-2 outline-none border-none dark:bg-transparent dark:text-white font-Peyda animate-fade-left"
              type="text"
              name="password"
              id="password"
              placeholder="رمز عبور"
            />
          </div>
          <button
            type="submit"
            className="block w-full dark:bg-white bg-black text-white mt-4 py-2 rounded-2xl dark:text-black font-semibold mb-2 active:scale-95 transition-all ease-in-out"
          >
            ورود
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer dark:text-white dark:hover:text-blue-300">
            فراموشی رمز عبور ?
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
