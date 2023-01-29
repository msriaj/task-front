/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify/notify";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password, retypePassword } = Object.fromEntries(formData);
    if (password === retypePassword) {
      const isRegSuccess = await register({ email, password });
      if (isRegSuccess) {
        notify("Reg Successfully !!");
        navigate("/billing");
        setError("");
      } else {
        setError("");
      }
    } else {
      setError("Password didn't matched !!!");
    }
  };

  return (
    <div className="flex md:py-16 justify-center  h-screen items-center bg-blue-50">
      <div className="w-full max-w-md">
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
          <div className="mb-4">
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
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="retypePassword">
              Retype Password
            </label>
            <input
              className="shadow appearance-none border   rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="retypePassword"
              id="retypePassword"
              placeholder="*****"
            />
            <p className="text-red-400">{error}</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p className="text-left mt-5 text-gray-500 text-xs">
            {" "}
            Already have Account ?{" "}
            <Link className="text-blue-500 font-bold" to="/login">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
