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
  let navigate = useNavigate();

  const popupGuide = () => {
    dispatch(update());
  };

  useEffect(() => {
    async function checkUser() {
      let userInfo = sessionStorage.getItem("userInfo");

      if(!userInfo){
        const response1 = await axios.get("/api/user/getuser");

        if (response1.status !== 401) {
          userInfo = {
            isLogin: true,
            userInfo: response1.data
          };

          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

          setUser({
            avtar: `https://cdn.discordapp.com/avatars/${response1.data?.userid}/${response1.data?.avatar}.png?size=128`,
          });
          setIsLogin(true);
        } else {
          navigate("/");
        }
      } 
      else {
          const user_info = JSON.parse(userInfo);
          setUser({
            avtar: `https://cdn.discordapp.com/avatars/${user_info.userInfo?.userid}/${user_info.userInfo?.avatar}.png?size=128`,
          });
          setIsLogin(true);
      }
      
    }
    checkUser();
  }, []);

  return (
    <div id="sidebar">
      {isLogin ? <LoggedIn user={user} /> : <LoggedOut />}

      <nav>
        <NavLink to="/home" 
          className={({ isActive }) =>
            isActive ? "active-nav nav-item" : "nav-item"
          }
        >
          <EarnSVG color={"#75D10A"} />
          <span>Earn Coins</span>
        </NavLink>
        <NavLink to="/mylinks"
          className={({ isActive }) =>
          isActive ? "active-nav nav-item" : "nav-item"
        }>
          <LinkSvg color={"#75D10A"} />
          <span>My Links</span>
        </NavLink>
        <NavLink to="#" onClick={popupGuide}>
          <GuidSvg color={"#75D10A"} />
          <span>Guide</span>
        </NavLink>
        <NavLink to="/"
          end
          className={({ isActive }) =>
          isActive ? "active-nav nav-item" : "nav-item"
        }>
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
  let navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('userInfo');
    window.location.href = '/logout';
    // navigate("/logout");
  }

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
          <a className="user" href="/profile">
            <User />
          </a>
          <a className="dollar" href="/replenish">
            <Dollar />
          </a>
          {/* <a href="/logout" className="logout">
            <img src={logoutImg} alt="logout" />
          </a> */}
          <a className="logout" onClick={() => logout()}>
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
