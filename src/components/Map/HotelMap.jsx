import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelProvider";
// import "../../map.css";
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
function HotelMap() {
  const { isLoading, hotels } = useHotels();
  const [searchParams] = useSearchParams();
  const [mapCenter, setMapCenter] = useState([
    25.290880861396644, 60.62710096897881,
  ]);
  const lng = searchParams.get("lang");
  const lat = searchParams.get("lat");
  const {
    isLoading: isLoadingGeoPosition,
    position: geoPosition,
    getPosition,
  } = useGeoLocation();
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapCenter([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);
  return (
    <div>
      {isLoading ? (
        <div className="bg-slate-200 w-full h-[35rem] rounded-lg animate-pulse"></div>
      ) : (
        <MapContainer
          className="h-[35rem] w-full rounded-lg"
          center={mapCenter}
          scrollWheelZoom={true}
        >
          <button
            onClick={getPosition}
            className="z-[1000] font-Peyda absolute bottom-7 right-5 bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-colors ease-linear active:scale-95"
          >
            {isLoadingGeoPosition
              ? "لطفا شکیبا باشید ..."
              : " استفاده از مکان شما"}
          </button>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeCenter position={mapCenter} zoom={lat && lng ? 16.5 : 4.5} />
          {!lat ? (
            hotels.map((item) => (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>{item.name}</Popup>
              </Marker>
            ))
          ) : (
            <Marker position={[lat, lng]}></Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
}

export default HotelMap;

function ChangeCenter({ position, zoom }) {
  const map = useMap();
  map.setView(position);
  map.setZoom(zoom);
}
