import { Link, Outlet } from "react-router-dom";
import HotelMap from "./Map/HotelMap";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function AppLayout() {
  return (
    <div className="flex flex-col lg:flex-row justify-between my-7 mb-20 px-3 lg:gap-0 gap-5">
      <div className="w-full lg:w-3/4 h-full">
        <Outlet />
      </div>
      <div className="w-full lg:w-1/3 h-full">
        <Link to="/" className="text-left text-blue-500 flex items-center justify-end gap-3">
          <span>برگشت به صفحه اصلی</span>
          <ArrowLeftIcon className="w-4 pt-1" />
        </Link>
        <h2 className="text-lg font-Peyda">آدرس دقیق :</h2>
        <HotelMap />
      </div>
    </div>
  );
}

export default AppLayout;
