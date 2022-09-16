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

export default function Sidebar() {
  const dispatch = useDispatch();

  const popupGuide = () => {
    dispatch(update());
  };

  return (
    <div id="sidebar">
      <LoggedOut />
      {/* <LoggedIn /> */}

      <nav>
        <NavLink to="/">
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

function LoggedIn() {
  return (
    <div className="avatar">
      <img src={avatarImg} alt="avatar" />
      <Popup
        className="sidebar"
        trigger={open => (
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
          <button className="logout">
            <img src={logoutImg} alt="logout" />
          </button>
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