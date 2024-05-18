import {
  AdjustmentsHorizontalIcon,
  ArrowUturnRightIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import { getAllProvinces } from "../..";
import { getCitiesByProvinceName } from "../..";
import useOutSideClick from "../../hooks/useOutSideClick";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import faIR from "date-fns/locale/fa-IR";
import { createSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHotels } from "../context/HotelProvider";

function Navbar() {
  // ----------------------
  const navigate = useNavigate();
  const { inputValueHotel, setInputValueHotel } = useHotels();
  const [destination, setDestination] = useState([]);
  const [openOptions, setOpenOptions] = useState(null);
  if (openOptions) {
    let x = window.matchMedia("(max-width: 768px)");
    if (x.matches) {
      document.body.style.overflow = "hidden";
    }
  } else {
    document.body.style.overflow = "auto";
  }
  const [options, setOptions] = useState({
    children: 0,
    adult: 1,
    room: 1,
  });
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "travelingDateRange",
    },
  ]);
  const handleSearch = () => {
    if (destination.length > 1) {
      const encodedParams = createSearchParams({
        date: JSON.stringify(date),
        city: destination[0],
        Province: destination[1],
        options: JSON.stringify(options),
      });
      navigate({
        pathname: "/hotels",
        search: encodedParams.toString(),
      });
    } else {
      toast.error("لطفا یک مقصد انتخاب کنید");
    }
  };
  return (
    <div className="flex flex-row-reverse">
      <div className="flex justify-between flex-col lg:flex-row items-center z-50 gap-1 flex-1">
        <div className="flex md:items-center flex-col md:flex-row gap-5 w-3/4 md:w-auto">
          <SelectDestination
            setDestination={setDestination}
            destination={destination}
            openOptions={openOptions}
            setOpenOptions={setOpenOptions}
          />
          <SelectPersonAndRoom
            options={options}
            openOptions={openOptions}
            setOpenOptions={setOpenOptions}
            handleOptions={handleOptions}
          />
          <SelectChekInOut
            date={date}
            setDate={setDate}
            openOptions={openOptions}
            setOpenOptions={setOpenOptions}
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative bg-gray-400/10 hover:bg-gray-400/20 transition-colors p-2 rounded-full px-5">
            <input
              type="text"
              placeholder="جستجو "
              className="bg-transparent outline-none text-sm dark:text-white"
              onChange={(e) => setInputValueHotel(e.target.value)}
              value={inputValueHotel}
            />
            <MagnifyingGlassIcon className="w-4 absolute top-3 left-3 dark:text-white" />
          </div>
          <div className="w-0.5 h-4 bg-gray-200 hidden md:inline-block"></div>
          <button
            onClick={handleSearch}
            className="bg-gray-400/10 text-gray-600 hover:bg-gray-400/20 transition-colors px-6 py-3 rounded-full flex gap-3 justify-center mt-1 text-sm"
          >
            <p className="text-xs lg:text-base dark:text-white">فیلتر کردن</p>
            <AdjustmentsHorizontalIcon className="w-5 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

function SelectDestination({
  setDestination,
  destination,
  setOpenOptions,
  openOptions,
}) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, () => setOpenOptions(null));
  const provinces = getAllProvinces();
  const [provincesSelect, setProvincesSelect] = useState();
  return (
    <div className="md:relative">
      <p className="text-sm lg:text-base dark:text-white">مقصد</p>
      <button
        type="button"
        className="bg-gray-400/10 hover:bg-gray-400/20 transition-colors p-2 rounded-lg flex gap-1 justify-center mt-1 w-full dark:text-white"
        onClick={() => setOpenOptions(1 === openOptions ? null : 1)}
      >
        <IoLocationOutline />
        {destination.length > 0 ? (
          <p className="text-xs pl-3">
            {destination[1]} ,{destination[0]}
          </p>
        ) : (
          <p className="text-xs pl-3">انتخاب</p>
        )}
      </button>
      {openOptions === 1 ? (
        <div
          ref={optionsRef}
          className="cus-scroll z-[9999] animate-fade absolute top-0 md:top-auto right-0 md:right-auto md:w-44 md:h-44 h-full pb-20 pt-4 w-full text-xs bg-white dark:bg-gray-700 dark:text-white dark:border-none md:border px-5 md:py-2 overflow-auto scroll-smooth md:mt-3 md:rounded-lg"
        >
          <XMarkIcon
            className="w-8 md:hidden text-gray-600 dark:text-white animate-fade-left"
            onClick={() => setOpenOptions(false)}
          />
          {provincesSelect ? (
            <div className="pr-3 md:pr-0 pt-5 md:pt-0">
              <div className="w-full flex items-center justify-between">
                <p className="text-sm">شهر ها </p>
                <button className="flex" onClick={() => setProvincesSelect()}>
                  <ArrowUturnRightIcon className="w-4" />
                </button>
              </div>
              <ul className="pt-1">
                {getCitiesByProvinceName(provincesSelect).map((c) => (
                  <li
                    onClick={() => {
                      setDestination([]);
                      setDestination((prev) => [...prev, c.name]);
                      setDestination((prev) => [...prev, provincesSelect]);
                      setProvincesSelect();
                      setOpenOptions(false);
                      document.body.style.overflow = "auto";
                    }}
                    key={c.id}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg cursor-pointer"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="pr-3 md:pr-0 pt-5 md:pt-0">
              <p className="text-sm">استان </p>
              <ul className="pt-1">
                {provinces.map((p) => (
                  <li
                    onClick={() => setProvincesSelect(p.name)}
                    key={p.id}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg cursor-pointer"
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
function SelectChekInOut({ setOpenOptions, openOptions, date, setDate }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, () => setOpenOptions(null));

  let optionsDate = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div className="md:relative">
      <p className="text-sm lg:text-base dark:text-white">زمان ورود و خروج</p>
      <button
        type="button"
        onClick={() => setOpenOptions(4 === openOptions ? null : 4)}
        className="bg-gray-400/10 hover:bg-white-400/20 transition-colors p-2 rounded-lg flex gap-1 justify-center mt-1 w-full dark:text-white"
      >
        <CalendarDaysIcon className="w-4" />
        <p className="text-xs pl-4 flex  gap-2">
          <span>
            {date[0].startDate.toLocaleDateString("fa-IR", optionsDate)}
          </span>
          تا
          <span>
            {date[0].endDate.toLocaleDateString("fa-IR", optionsDate)}
          </span>
        </p>
      </button>
      {openOptions === 4 ? (
        <div ref={optionsRef}>
          <div className="absolute md:mt-3 bg-white dark:bg-gray-500 md:bg-transparent dark:md:bg-transparent z-[998] w-full  right-0 top-0 h-full md:pointer-events-none flex flex-col">
            <XMarkIcon
              className="w-8 md:hidden mr-5 text-gray-600 dark:text-white animate-fade-left"
              onClick={() => setOpenOptions(false)}
            />
            <DateRange
              dateDisplayFormat="MMM d, yyyy"
              ranges={date}
              selected={date[0].startDate}
              className="h-full md:h-auto mt-2 md:mt-16 pointer-events-auto mx-auto animate-fade"
              moveRangeOnFirstSelection={true}
              minDate={new Date()}
              locale={faIR}
              onChange={(item) => setDate([item.travelingDateRange])}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function SelectPersonAndRoom({
  setOpenOptions,
  openOptions,
  options,
  handleOptions,
}) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, () => setOpenOptions(null));
  return (
    <div className="md:relative">
      <p className="text-sm lg:text-base dark:text-white"> مسافران و اتاق ها</p>
      <button
        type="button"
        onClick={() => setOpenOptions(2 === openOptions ? null : 2)}
        className="bg-gray-400/10 hover:bg-gray-400/20 transition-colors p-2 rounded-lg flex gap-1 justify-center mt-1 w-full dark:text-white"
      >
        <UserIcon className="w-4" />
        <p className="text-xs pl-4">
          <span>{options.adult + options.children} مسافر </span> &nbsp;, &nbsp;
          <span>{options.room}&nbsp; اتاق</span>
        </p>
      </button>
      {openOptions === 2 ? (
        <div
          ref={optionsRef}
          className="cus-scroll z-[9999]  absolute md:w-52 w-full  text-xs bg-white dark:bg-gray-700 dark:border-none dark:text-white md:border px-5 py-3 pt-5 overflow-hidden md:overflow-auto scroll-smooth md:mt-3 md:rounded-lg top-0 md:top-auto right-0 md:right-auto h-full md:h-auto"
        >
          <XMarkIcon
            className="w-8 md:hidden mr-2 text-gray-600 dark:text-white animate-fade-left"
            onClick={() => setOpenOptions(false)}
          />
          <div className="flex flex-col gap-3 mt-20 h-full md:mt-auto animate-fade">
            <OptionsItem
              typeEn="adult"
              typeFa="بزرگسال"
              options={options}
              minLimit={1}
              minCon="12 سال به بالا"
              handleOptions={handleOptions}
            />
            <OptionsItem
              typeEn="children"
              typeFa="کودک"
              options={options}
              minLimit={0}
              minCon="تا 12 سال"
              handleOptions={handleOptions}
            />
            <OptionsItem
              typeEn="room"
              typeFa="اتاق"
              options={options}
              minLimit={1}
              minCon="دقت کنید"
              handleOptions={handleOptions}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function OptionsItem({
  options,
  typeEn,
  typeFa,
  minLimit,
  minCon,
  handleOptions,
}) {
  return (
    <div className="flex justify-between">
      <div>
        <p className="text-sm"> {typeFa} : </p>
        <p className="text-[10px] text-gray-400">{minCon}</p>
      </div>
      <div className="flex items-center justify-around gap-3 ">
        <button
          onClick={() => handleOptions(typeEn, "inc")}
          type="button"
          className="bg-slate-400/10 border  p-1.5 rounded-full focus:ring-1 ring-gray-600 hover:bg-slate-400/15 active:bg-slate-400/20"
        >
          <HiPlus />
        </button>
        <span>{options[typeEn]}</span>
        <button
          onClick={() => handleOptions(typeEn, "dec")}
          disabled={options[typeEn] <= minLimit}
          type="button"
          className="bg-slate-400/10 border disabled:cursor-default p-1.5 rounded-full focus:ring-1 ring-gray-600 hover:bg-slate-400/15 active:bg-slate-400/20 disabled:active:bg-slate-400/10 disabled:hover:bg-slate-400/10 disabled:bg-slate-400/10"
        >
          <HiMinus />
        </button>
      </div>
    </div>
  );
}
// &nbsp;
