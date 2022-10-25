import { NavLink } from "react-router-dom";
import DiscordSvg from "../../res/svg/Discord";
import InstagramSvg from "../../res/svg/Instagram";
import TwitterSvg from "../../res/svg/Twitter";
import coinImg from "../../res/imgs/coin.png";
import diamondImg from "../../res/imgs/diamond.png";
import plusImg from "../../res/imgs/plus.png";
import logoImg from "../../res/imgs/Logo.png";
import User from "../../res/svg/User";
import Dollar from "../../res/svg/Dollar";
import logoutImg from "../../res/imgs/logout.png";
import loginImg from "../../res/imgs/login.png";
import arrowImg from "../../res/imgs/arrowdown.png";
import avatarImg from "../../res/imgs/avatar.png";
import axios from "axios";
import Popup from "reactjs-popup";
import "./header.scss";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Header() {
  const [svgColors, setColor] = useState({
    discord: "#383F56",
    instagram: "#383F56",
    twitter: "#383F56"
  });
  const [user, setUser] = useState({ avtar: avatarImg });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      let session = sessionStorage.getItem("userInfo");

      if(session){
        const user_info = JSON.parse(session);
        setUser({
          avtar: `https://cdn.discordapp.com/avatars/${user_info.userInfo?.userid}/${user_info.userInfo?.avatar}.png?size=128`,
        });
        setIsLogin(true);
      }
    }
    checkUser();
  }, []);

  let diamonds = 0;
  let stars = 0;
  const balance = useSelector((state) => state.userBalance);

  const { earned, purchased } = balance;
  diamonds = earned.diamonds + purchased.diamonds;
  stars = earned.stars + purchased.stars;

  return (
    <header>
      <div className="h-content">
        <div className="social">
          <NavLink
            to="#"
            onMouseEnter={() => {
              setColor({ ...svgColors, discord: "#7bd812" });
            }}
            onMouseLeave={() => {
              setColor({ ...svgColors, discord: "#383F56" });
            }}
          >
            <DiscordSvg color={svgColors.discord} />
          </NavLink>
          <NavLink
            to="#"
            onMouseEnter={() => {
              setColor({ ...svgColors, instagram: "#7bd812" });
            }}
            onMouseLeave={() => {
              setColor({ ...svgColors, instagram: "#383F56" });
            }}
          >
            <InstagramSvg color={svgColors.instagram} />
          </NavLink>
          <NavLink
            to="#"
            onMouseEnter={() => {
              setColor({ ...svgColors, twitter: "#7bd812" });
            }}
            onMouseLeave={() => {
              setColor({ ...svgColors, twitter: "#383F56" });
            }}
          >
            <TwitterSvg color={svgColors.twitter} />
          </NavLink>
        </div>

        <div className="assets">
          <div className="coins">
            <img src={coinImg} alt="coin" />
            <h4>{stars}</h4>
          </div>

          <div className="diamonds">
            <img src={diamondImg} alt="diamond" />
            <h4>{diamonds}</h4>
          </div>

          <NavLink to="/replenish">
            <div className="replenish">
              <img src={plusImg} alt="diamond" />
              <h4>Replenish</h4>
            </div>
          </NavLink>
        </div>

        <div className="top">
          {isLogin ? <LoggedIn user={user} /> : <LoggedOut />}

          <div className="brand">
            <h3>Linked Cord</h3>
            <img src={logoImg} alt="Linked Cord" />
          </div>
        </div>
      </div>
    </header>
  );
}

function LoggedIn({ user }) {
  return (
    <div className="avatar">
      <img src={user.avtar} alt="avatar" />
      <Popup
        className="header"
        trigger={(open) => (
          <button>
            <img src={arrowImg} alt="arrow" />
          </button>
        )}
        on={["click"]}
        position={`bottom center`}
        closeOnDocumentClick
      >
        <div className="items">
          <button className="user">
            <User />
          </button>
          <button className="dollar">
            <Dollar />
          </button>
          <a href="/logout" className="logout">
            <img src={logoutImg} alt="logout" />
          </a>
        </div>
      </Popup>
    </div>
  );
}

function LoggedOut() {
  return (
    <div className="nonauth">
      <a href="/login">
        <img src={loginImg} alt="login" />
      </a>
    </div>
  );
}
