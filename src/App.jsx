import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import HotelProvider from "./components/context/HotelProvider";
import FavoriteProvider from "./components/context/FavoriteProvider";
import Navbar from "./components/Navbar/Navbar";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import LocationList from "./components/LocatonList/LocationList";
import RigLog from "./components/QuiqNav";
import { useRef, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const bgFade = useRef(null);
  const [onOpen, setOnOpen] = useState(false);
  return (
    <HotelProvider>
      <FavoriteProvider>
        <div className=" container min-h-screen pt-4 pb-10  font-PeydaMed">
          <div
            ref={bgFade}
            className="fixed inset-0 z-[9999] transition-all duration-300 bg-black/30 dark:bg-black/70 opacity-0 invisible"
          ></div>
          <Toaster />
          <Navbar />
          <RigLog bgFade={bgFade} setOnOpen={setOnOpen} onOpen={onOpen}  />
          <Modal onOpen={onOpen} setOnOpen={setOnOpen} />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
          </Routes>
        </div>
      </FavoriteProvider>
    </HotelProvider>
  );
}

export default App;
