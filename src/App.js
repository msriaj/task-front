import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGuard from "./Guards/AuthGuard";
import AuthGuest from "./Guards/AuthGuest";
import Main from "./Layout/Main";
import Billing from "./Pages/Billing";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <AuthGuest> <Login /> </AuthGuest>} />
          <Route path="/register" element={ <AuthGuest> <Register /> </AuthGuest> } />
          <Route path="/billing" element={ <AuthGuard> <Billing /> </AuthGuard> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
