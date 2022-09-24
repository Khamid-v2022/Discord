import avatarImg from "../../res/imgs/avatar.png";
import arrowImg from "../../res/imgs/arrowdown.png";
import discordImg from "../../res/imgs/discord.png";
import earnImg from "../../res/imgs/earn.png";
import linkImg from "../../res/imgs/link.png";
import guidImg from "../../res/imgs/star.png";
import faqImg from "../../res/imgs/question.png";
import logoutImg from "../../res/imgs/logout.png";
import loginImg from "../../res/imgs/login.png";
// svg
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
        console.log("checkuser",response)
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
          <img src={earnImg} alt="Earn Coins" />
          <span>Earn Coins</span>
        </NavLink>
        <NavLink to="/mylinks">
          <img src={linkImg} alt="My Links" />
          <span>My Links</span>
        </NavLink>
        <NavLink to="#" onClick={popupGuide}>
          <img src={guidImg} alt="Guide" />
          <span>Guide</span>
        </NavLink>
        <NavLink to="/">
          <img src={faqImg} alt="FAQ" />
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
