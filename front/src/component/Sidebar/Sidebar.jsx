import avatarImg from "../../res/imgs/avatar.png";
import arrowImg from "../../res/imgs/arrowdown.png";
import discordImg from "../../res/imgs/discord.png";
import EarnSVG from "../../res/svg/EarnCoins";
import LinkSvg from "../../res/svg/Link";
import GuidSvg from "../../res/svg/Guide";
import FaqSvg from "../../res/svg/Faq";
import logoutImg from "../../res/imgs/logout.png";
import loginImg from "../../res/imgs/login.png";
import Dollar from "../../res/svg/Dollar";
import User from "../../res/svg/User";

import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import { useDispatch } from "react-redux";
import { update } from "../../redux/reducers/guidePopup";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [user, setUser] = useState({ avtar: avatarImg });
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const popupGuide = () => {
    dispatch(update());
  };

  useEffect(() => {
    async function checkUser() {
      const response = await axios.get("/api/user/getuser");
      if (response.status != 401) {
        console.log("checkuser", response)
        if(response.data.avatar)
          setUser({avtar:`https://cdn.discordapp.com/avatars/${response.data?.userid}/${response.data?.avatar}.png?size=128`})
        setIsLogin(true);
      }
    }
    checkUser();
  }, []);

  return (
    <div id="sidebar">
      {isLogin ? <LoggedIn user={user} /> : <LoggedOut />}

      <nav>
        <NavLink to="/home">
          <EarnSVG color={"#75D10A"} />
          <span>Earn Coins</span>
        </NavLink>
        <NavLink to="/mylinks">
          <LinkSvg color={"#75D10A"} />
          <span>My Links</span>
        </NavLink>
        <NavLink to="#" onClick={popupGuide}>
          <GuidSvg color={"#75D10A"} />
          <span>Guide</span>
        </NavLink>
        <NavLink to="/">
          <FaqSvg  color={"#75D10A"} />
          <span>FAQ</span>
        </NavLink>
      </nav>

      <div className="discord">
        <img src={discordImg} alt="discord" />
      </div>
    </div>
  );
}

function LoggedIn({user}) {
  return (
    <div className="avatar">
      <img src={user.avtar} alt="avatar" />
      <Popup
        className="sidebar"
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
          <a className="dollar" href="/replenish">
            <Dollar />
          </a>
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
