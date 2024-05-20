import { useState } from "react";
import toast from "react-hot-toast";

function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState([]);
  const [error, setError] = useState();
  function getPosition() {
    if (!navigator.geolocation)
      return setError("مرورگر شما از geolocation پشتیبانی نمیکند");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        toast.error(err.message)
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, getPosition  , error};
}

export default useGeoLocation;
