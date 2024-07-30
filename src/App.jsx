import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import HotelProvider from "./components/context/HotelProvider";
import FavoriteProvider from "./components/context/FavoriteProvider";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import LocationList from "./components/LocatonList/LocationList";
import Login from "./components/Auth/Login";
import Layout from "./components/Layout";
import AuthProvider from "./components/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <HotelProvider>
        <FavoriteProvider>
          <div className="font-Peyda">
            <Toaster />
          </div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LocationList />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </FavoriteProvider>
        
      </HotelProvider>
    </AuthProvider>
  );
}

export default App;



