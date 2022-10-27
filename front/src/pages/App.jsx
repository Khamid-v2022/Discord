import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import "../style/app.scss";
import "../style/fonts.scss";
import Guid from "./Guide/Guid";
import MyLinks from "./MyLinks/MyLinks";
import Replenish from "./Replenish/Replenish";
import Profile from "./Profile/Profile";
import Billing from "./Billing/Billing";
import History from "./History/History";

import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updateBalance } from "../redux/reducers/userBalance.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import Checkout from "./Checkout/checkout";
import Home from "./Home/home";

export default function App() {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    async function fetchBalance() {
      try {
        const response2 = await axios.get("/api/user/getbalance");
        dispatch(updateBalance(response2.data));
        if (pathname === "/") {
          navigate("/home");
        }
      } catch (error) {
        navigate("/");
      }
    }
    fetchBalance();
  }, []);

  return (
    <section id="app">
      <Guid />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/mylinks" element={<MyLinks />} />
        <Route path="/replenish" element={<Replenish />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </section>
  );
}
