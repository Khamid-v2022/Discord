import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import serverImg from "../../res/imgs/serverimg.png";
import coinImg from "../../res/imgs/coin.png";

import "./homepage.scss";
import { useEffect, useState } from "react";
export default function Homepage() {
  return (
    <section id="homepage">
      <div className="container">
        <div className="content">
          <Sidebar />
          <div className="main">
            <Header />
            <PageContent />
          </div>
        </div>
      </div>
    </section>
  );
}

let cb;
function PageContent() {
  let [progressBar, setProgressBar] = useState(35);
  let [stopWatchT, setStopWatchT] = useState(25);
  const [invite, setInvite] = useState({
    icon: serverImg,
    server: "",
    link: "",
    name: "Server Comming...",
    linkId: "",
    remaining: "",
  });



    return (
      <section id="server_joining">
        <div className="thumbnail">
          {invite.icon ? (
            <img src={invite.icon} alt="server" />
          ) : (
            <div style={{ color: "white", padding: "18px", width: "60%" }}>
              No PFP Found!
            </div>
          )}
        </div>

        <div className="details">
          <p>You've been invited to join</p>
          <h1>Fortnite Discord</h1>
          <p className="member-count">124,000 members</p>
        </div>

        <div className="progress">
          <div className="progressbar">
            <div
              className="bar"
              style={{ width: `${(progressBar / 60) * 100}%` }}
            ></div>
          </div>
        <p>
            <span>{stopWatchT} sec</span> left to make a decision
        </p>
        </div>

        <div className="actions">
          {stopWatchT ? (
            <>
              <button className="skip" >
                Skip to next one
              </button>

              <a className="join" href="/replenish">
                <img src={coinImg} alt="coin" />
                <span>Join and earn 1 coin</span>
              </a>
            </>
          ) : (
            <button className="join">
              <span>Go Back</span>
            </button>
          )}
        </div>
      </section>
    );

}
