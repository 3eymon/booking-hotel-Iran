import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProtacredRoute({ children, message }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      if (message) {
        toast.error(message);
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, message]);
  return isAuthenticated ? children : null;
}
