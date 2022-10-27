import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import serverImg from "../../res/imgs/serverimg.png";
import coinImg from "../../res/imgs/coin.png";

import "./homepage.scss";
import axios from "axios";
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
  let [progressBar, setProgressBar] = useState(60);
  let [stopWatchT, setStopWatchT] = useState(2);
  let [inviteStatus, setInviteStatus] = useState(false);

  const [joining, setJoining] = useState(false);
  const [result, setResult] = useState(false);
  const [invite, setInvite] = useState({
    icon: serverImg,
    server: "",
    link: "",
    name: "Server Comming...",
    linkId: "",
    remaining: "",
  });

  let timer = () => {
    if (stopWatchT > 1) {
      setStopWatchT((stw) => {
        return stw - 1;
      });
      setProgressBar((pb) => {
        return pb + 1;
      });
    } else {
      console.log("stop-watch: ", stopWatchT);
      console.log("progressBar: ", progressBar);
      clearInterval(cb);
    }
  };

  // checking status
  const checkresult = async () => {
    const response = await axios.get(
      `/api/invite/checkstatus?id=${invite.linkId}`
    );

    if (response.status === 200) {
      if (response.data.status === "Complete") {
        setResult(true);
      }
    } else {
      console.log(response);
    }
  };

  // stoping timer at 0
  if (stopWatchT === 0) {
    checkresult();
    clearInterval(cb);
  }

  // fetching invitation
  const fetchServer = async () => {
    cb = 0;
    const response = await axios.get("/api/invite/assign");
    console.log(response);
    const { data } = response;
    
    if (response.status === 200) {
      if (data.joiner.status !== "Expired") {
        setInvite({
          icon: data.invite.iconId
            ? `https://cdn.discordapp.com/icons/${data.invite?.serverId}/${data.invite?.iconId}.png?size=512`
            : false,
          server: data.invite?.serverId,
          link: data.invite?.link,
          name: data.invite?.serverName,
          linkId: data.joiner._id,
          time: data.joiner.expire_at,
        });

        // if time in negative then allow user to join
        if (data.joiner.remaining < 0) {
          setStopWatchT(() => {
            return data.joiner.remaining * -1;
          });

          setProgressBar((prev) => {
            return data.joiner.remaining + prev;
          });
          // running timer
          cb = setInterval(() => {
            console.log("stop_watch: ", stopWatchT);
            console.log("joiner.remaining: ", data.joiner.remaining);
            timer();
          }, 1000);
        } else {
          // clearInterval(cb);
          console.log("stop_watch: ", stopWatchT);
        }
      } else {
        setJoining(false);
      }
    } else if(response.status === 204){
      setInviteStatus(true);
    }
  };

  // cleaning surface
  const cleanSurface = () => {
    clearInterval(cb);
    setInvite({
      icon: serverImg,
      server: "",
      link: "",
      name: "Server Comming...",
      linkId: "",
      remaining: "",
    });
    setJoining(false);
    setResult(false);
    setProgressBar(60);
    setStopWatchT(2);
  };

  const startjoining = async () => {
    setJoining(true);
    await fetchServer();
  };

  if (joining && invite.server == "") {
    return (
      <>
        {inviteStatus ? (
          <>
            <p className="status">No Invite Available, try again later.</p>
            <button className="join" onClick={() => cleanSurface()}>
              <span>Go Back</span>
            </button>
          </>
        ) : (
          <p className="status">please wait while loding...</p>
        )}
      </>
    );
  }

  if (joining) {
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
          <h1>{invite.name}</h1>
          {/* <p className="member-count">124,000 members</p> */}
        </div>

        <div className="progress">
          <div className="progressbar">
            <div
              className="bar"
              style={{ width: `${(progressBar / 60) * 100}%` }}
            ></div>
          </div>
          {stopWatchT ? (
            <p>
              <span>{stopWatchT} sec</span> left to make a decision
            </p>
          ) : (
            <>
              {result ? (
                <p>Congrats! You Earned a Coin.</p>
              ) : (
                <p>You haven't join the Server in Time.</p>
              )}
            </>
          )}
        </div>

        <div className="actions">
          {stopWatchT ? (
            <>
              <button className="skip" onClick={() => cleanSurface()}>
                Skip to next one
              </button>

              <a className="join" href={invite.link} target="_blank">
                <img src={coinImg} alt="coin" />
                <span>Join and earn 1 coin</span>
              </a>
            </>
          ) : (
            <button className="join" onClick={() => cleanSurface()}>
              <span>Go Back</span>
            </button>
          )}
        </div>
      </section>
    );
  }

  if (!joining) {
    return (
      <>
        <button className="start" onClick={() => startjoining()}>
          Looking for Server to Join?
        </button>
      </>
    );
  }
}
