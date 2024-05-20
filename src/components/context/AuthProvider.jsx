import { createContext, useContext, useReducer } from "react";
import useCookie from "../../hooks/useCookie";

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
const FAKE_USER = {
  id: "N2sdSa58Q41",
  name: "Mohsen",
  email: "user@gmail.com",
  password: "123456789",
};

export default function AuthProvider({ children }) {
  const { getCookie, setCookie, deleteCookie } = useCookie();
  const initialState =
    getCookie("USER_ID") === FAKE_USER.id
      ? {
          user: FAKE_USER,
          isAuthenticated: true,
        }
      : {
          user: null,
          isAuthenticated: false,
        };
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function Login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      setCookie("USER_ID", FAKE_USER.id);
    }
  }
  function LogOut() {
    dispatch({ type: "logout", payload: FAKE_USER });
    deleteCookie("USER_ID");
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, Login, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
