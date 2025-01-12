import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  // بررسی وضعیت احراز هویت و سطح دسترسی
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
