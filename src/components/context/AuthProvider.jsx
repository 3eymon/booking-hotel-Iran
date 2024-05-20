import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
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
  name: "Mohsen",
  email: "user@gmail.com",
  password: "123456789",
};
export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function Login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function LogOut() {
    dispatch({ type: "logout", payload: FAKE_USER });
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
