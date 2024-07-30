import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../backendless";

export default function useFetch(id, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/hotels.json`);
        if (id) {
          setData(data.filter((e) => e.id === id)[0]);
        } else {
          setData(data);
        }
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id, query]);
  return { data, isLoading };
}
