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

  const [result, setResult] = useState(false);
  const [invite, setInvite] = useState({
    icon: serverImg,
    server: "",
    link: "",
    name: "Server Comming...",
    linkId: "",
    remaining: "",
    serverId: "",
    is_load: false
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
        clearInterval(cb);
      }
    } else {
      console.log(response);
    }
  };

   // checking status real-time every 15s
  const checkresult_realtime = async () => {
    if(invite.serverId !== ""){
      const response = await axios.get(
        `/api/invite/checkIsJoined?id=${invite.serverId}`
      );
      
      if(response.status === 200) {
        setResult(true);
        clearInterval(cb);
        
        cleanSurface();
        fetchServer();
      }
    }
  };

  // stoping timer at 0
  if (stopWatchT === 0) {
    checkresult();
    clearInterval(cb);
  }

  // fetching invitation
  const fetchServer = async () => {
    setInviteStatus(false);

    cb = 0;
    const response = await axios.get("/api/invite/assign");

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
          serverId: data.invite?.serverId,
          is_load: true
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
            timer();
          }, 1000);
        } else {
          // clearInterval(cb);
          console.log("stop_watch: ", stopWatchT);
        }
      }
    } else if(response.status === 204){
      setInviteStatus(true);
      cleanSurface();
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
      is_load: false
    });

    setResult(false);
    setProgressBar(60);
    setStopWatchT(2);
  };

  // fetchServer();

  useEffect(async () => {
    await fetchServer();
  }, []);

  useEffect(() => {
    if(stopWatchT % 15 === 0){
      // checking if joined to current server for every 15s
      checkresult_realtime();
    }
  }, [stopWatchT])

  if(invite.server){
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
              <button className="skip" onClick={() => {
                  cleanSurface(); 
                  fetchServer();
                }}>
                Skip to next one
              </button>

              <a className="join" href={invite.link} target="_blank">
                <img src={coinImg} alt="coin" />
                <span>Join and earn 1 coin</span>
              </a>
            </>
          ) : (
            <button className="join" onClick={() => {
              cleanSurface();
              fetchServer();
            }}>
              <span>Go Back</span>
            </button>
          )}
        </div>
      </section>
    );
  } else {
    if(inviteStatus){
      return (
        <>
          <p className="status">No Invite Available, try again later.</p>
        </>
      )
    }
    return (
      <>
        <p className="status">Loading servers...</p>
      </>
    );
  }
}