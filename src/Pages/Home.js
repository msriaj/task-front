/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../Components/notify/notify";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
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
    <div>
      <div className="relative ">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative h-full bg-gray-900 bg-opacity-75">
          <div className="px-4  mx-auto md:w-9/12 md:px-24 lg:px-0  ">
            <div className="flex flex-col   px-5 md:px-10 xl:px-0 py-24 xl:py-0 xl:py-0   h-screen items-center justify-between xl:flex-row">
              <div className="hidden xl:block w-full max-w-xl     xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  Power-Hack
                  <br className="hidden md:block" />
                  <span className="text-teal-400">Power distribution</span> company
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                  Welcome to Power-Hack The power distribution company revolutionizing the way bills are managed. At Power-Hack, we believe that
                  managing bills should be a seamless and stress-free experience for our clients.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-700"
                >
                  Read more
                  <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">Sign up</h3>
                  <form onSubmit={submitHandler}>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="email" className="inline-block mb-1 font-medium">
                        E-mail
                      </label>
                      <input
                        placeholder="john.doe@example.org"
                        required
                        type="email"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="Password" className="inline-block mb-1 font-medium">
                        Password
                      </label>
                      <input
                        placeholder="*****"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        min={6}
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="retypePassword" className="inline-block mb-1 font-medium">
                        Retype Password
                      </label>
                      <input
                        placeholder="*****"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="retypePassword"
                        name="retypePassword"
                        min={6}
                      />
                      <p className="text-red-400">{error}</p>
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex bg-blue-500 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      >
                        Register
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      {" "}
                      Already have an Account ?{" "}
                      <Link className="text-blue-500 font-bold" to="/login">
                        Login Now
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Home;
