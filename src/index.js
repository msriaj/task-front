import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import UserContext from "./Context/AuthContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <UserContext>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  </UserContext>
);
