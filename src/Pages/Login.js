/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify/notify";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);

    const isLoginSuccess = await login(user);

    if (isLoginSuccess) {
      notify("Login Successfully !!");
      setError("");
    } else {
      setError("Invalid Email/Password !!");
    }
  };

  return (
    <div className="flex md:py-16 justify-center  h-screen items-center bg-blue-50">
      <div className="w-full max-w-xs">
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border   rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="*****"
            />
            <p>{error && <span className="text-red-500 text-xs italic">{error}</span>}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p className="text-left mt-5 text-gray-500 text-xs">
            {" "}
            Don't have Account ?{" "}
            <Link className="text-blue-500 font-bold" to="/register">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
