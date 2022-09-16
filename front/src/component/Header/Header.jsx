import { NavLink } from "react-router-dom";
import instagramImg from "../../res/imgs/instagram.png";
import twitterImg from "../../res/imgs/twitter.png";
import coinImg from "../../res/imgs/coin.png";
import diamondImg from "../../res/imgs/diamond.png";
import plusImg from "../../res/imgs/plus.png";
import logoImg from "../../res/imgs/Logo.png";

import "./header.scss";
import { useEffect } from "react";
import axios from "axios";
export default function Header() {

  useEffect(async () => {
    const response = await axios.get("/api/user/guilds");
    console.log(response);
  });

  return (
    <header>
      <div className="social">
        <NavLink to="/">
          <img src={instagramImg} alt="instagram" />
        </NavLink>
        <NavLink to="/">
          <img src={twitterImg} alt="twitter" />
        </NavLink>
      </div>

      <div className="assets">
        <div className="coins">
          <img src={coinImg} alt="coin" />
          <h4>47</h4>
        </div>

        <div className="diamonds">
          <img src={diamondImg} alt="diamond" />
          <h4>5</h4>
        </div>

        <NavLink to="/replenish">
          <div className="replenish">
            <img src={plusImg} alt="diamond" />
            <h4>Replenish</h4>
          </div>
        </NavLink>
      </div>

      <div className="brand">
        <h3>Linked Cord</h3>
        <img src={logoImg} alt="Linked Cord" />
      </div>
    </header>
  );
}
