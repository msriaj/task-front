import React, { createContext, useEffect, useState } from "react";
import { notify } from "../Components/notify/notify";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Axios } from "../services/axiosInstance";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const serverUrl = process.env.REACT_APP_API_URI;

const UserContext = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setToken] = useLocalStorage();
  const [user, setUser] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = () => {
    if (!user || !expiresAt) return false;
    return new Date().getTime() / 1000 < expiresAt;
  };

  const login = async (credentials) => {
    try {
      const res = await Axios.post("/login", credentials);

      if (res.data) {
        const { userInfo } = res.data;
        console.log(userInfo);
        setToken("token", userInfo.token);
        setExpiresAt(userInfo.expiresAt);
        setUser(userInfo.email);
        setIsLoading(false);

        return true;
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 401) {
        notify("Login Failed!!", "error");
        return false;
      }
    }
  };

  const register = async (credentials) => {
    try {
      const res = await Axios.post("/register", credentials);

      if (res.data) {
        const { userInfo } = res.data;
        console.log(userInfo);
        setToken("token", userInfo.token);
        setExpiresAt(userInfo.expiresAt);
        setUser(userInfo.email);
        setIsLoading(false);

        return true;
      }
    } catch (error) {
      console.log(error.response);
      if (error.response?.status === 400) {
        notify(error.response?.data, "error");
        return false;
      }
    }
  };

  const logout = () => {
    setUser(null);
    setExpiresAt(null);
    localStorage.removeItem("token");
  };

  const tokenVerify = async () => {
    try {
      const res = await Axios.get("/auth/token-verify");
      if (res.data) {
        const { user, expiresAt } = res.data;
        setExpiresAt(expiresAt);
        setUser(user);
        setIsLoading(false);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setUser(null);
        setExpiresAt(null);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    tokenVerify();
  }, []);

  const contextData = {
    isAuthenticated: isAuthenticated(),
    login,
    register,
    logout,
    user,
  };

  return <Provider value={contextData}>{isLoading ? <div>Loading...</div> : children}</Provider>;
};

export default UserContext;
