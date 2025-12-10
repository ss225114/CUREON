/* eslint-disable no-unused-vars */
import { setupInterceptors } from "@/lib/apiClient";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(
    localStorage.getItem("USER_DATA") ?? ""
  );
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") ?? null
  );

  const [refreshtoken, _setRefreshToken] = useState(
    localStorage.getItem("REFRESH_TOKEN") ?? null
  );

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setRefreshToken = (token) => {
    _setRefreshToken(token);
    if (token) {
      localStorage.setItem("REFRESH_TOKEN", token);
    } else {
      localStorage.removeItem("REFRESH_TOKEN");
    }
  };

  const setUser = (data) => {
    _setUser(data);
    if (data) {
      localStorage.setItem("USER_DATA", data);
    } else {
      localStorage.removeItem("USER_DATA");
    }
  };

  const logout = () => {
    _setUser("");
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER_DATA");
    window.location.href = "/";
  };

  useEffect(() => {
    setupInterceptors(token, setToken);
  }, [token]); // Reinitialize interceptors if either changes

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          setRefreshToken,
          logout,
          user,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
