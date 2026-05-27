import { createContext, useContext, useReducer, useEffect } from "react";
import useCookie from "../../hooks/useCookie";
import axios from "axios"; // برای ارسال درخواست‌ها به سرور
import toast from "react-hot-toast";

const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action!");
  }
}

export default function AuthProvider({ children }) {
  const { getCookie, setCookie, deleteCookie } = useCookie();

  // بررسی اولیه وضعیت ورود از کوکی
  const initialState = getCookie("USER_TOKEN")
    ? { user: null, isAuthenticated: true }
    : { user: null, isAuthenticated: false };

  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState);

  async function Login(email, password) {
    try {
      const response = await axios.post("https://booking-backend-production-bbba.up.railway.app/admin", { email, password });
      const { token } = response.data;

      if (token) {
        setCookie("USER_TOKEN", token);

        // دریافت اطلاعات کاربر با استفاده از توکن
        const userResponse = await axios.get("https://booking-backend-production-bbba.up.railway.app/admin/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "login", payload: userResponse.data });
        toast.success("ورود با موفقیت انجام شد!")
      } else {
        toast.error(response.data.message || "خطا در ورود!"); 
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("خطا در ورود!"); 
    }
  }

  function LogOut() {
    dispatch({ type: "logout" });
    deleteCookie("USER_TOKEN");
    toast.success("خروج با موفقیت انجام شد.");
  }

  useEffect(() => {
    const token = getCookie("USER_TOKEN");

    if (token) {
      axios
        .get("https://booking-backend-production-bbba.up.railway.app/admin/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch({ type: "login", payload: response.data });
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
          LogOut();
          toast.error("توکن معتبر نیست، لطفا دوباره وارد شوید."); 
        });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, isAuthenticated, Login, LogOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
