import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import serverImg from "../../res/imgs/serverimg.png";
import coinImg from "../../res/imgs/coin.png";

import "./homepage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBalance } from "../../redux/reducers/userBalance";

import Popup from "./Popup.jsx";

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
  const dispatch = useDispatch();

  let [progressBar, setProgressBar] = useState(60);
  let [stopWatchT, setStopWatchT] = useState(2);
  let [inviteStatus, setInviteStatus] = useState(false);
  let [openPopup, setOpenPopup] = useState(false);

  let [popupBtnDisable, setPoupBtnDisable] = useState(false);
  let [popupError, setPoupError] = useState("");

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

  const closePopup = () => {
    setPoupError("");
    setOpenPopup(false);
    cb = setInterval(() => {
      timer();
    }, 1000);
  }

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
    if(invite.linkId !== ""){
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
    }
  };

  const cancelJoin = async () => {
    if(invite.linkId !== ""){
      const response = await axios.get(
        `/api/invite/cancelJoin?id=${invite.linkId}`
      );
    }
  }

   // checking status real-time every 15s
  const checkingJoin = async () => {
    setPoupBtnDisable(true);
    if(invite.serverId !== ""){
      const response = await axios.get(
        `/api/invite/checkIsJoined?id=${invite.serverId}`
      );
      
      if(response.status === 200) {
        setResult(true);
        clearInterval(cb);
        
        cleanSurface();
        fetchServer();

        setPoupBtnDisable(false);
        
        setOpenPopup(false);

        // 
        const response2 = await axios.get("/api/user/getbalance");
        if (response2.status !== 401) {
          dispatch(updateBalance(response2.data));
        } 
      } else {
        setPoupBtnDisable(false);
        setPoupError("You are not joined to this server. Please make sure again!");
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

  const joinToServer = (e) => {
    setOpenPopup(true);
    clearInterval(cb);
    window.open(invite.link, '_blank', 'noopener,noreferrer');
  }

 

  useEffect(async () => {
    await fetchServer();
  }, []);


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
                  cancelJoin();
                  cleanSurface(); 
                  fetchServer();
                }}>
                Skip to next one
              </button>

              <a type="button" className="join" onClick={joinToServer}>
                <img src={coinImg} alt="coin" />
                <span>Join and earn 1 coin</span>
              </a>
            </>
          ) : (
            <button className="join" onClick={() => {
              cancelJoin();
              cleanSurface();
              fetchServer();
            }}>
              <span>Go Back</span>
            </button>
          )}
        </div>
        <Popup 
          open={openPopup} 
          closePopup={closePopup} 
          checkingJoin={checkingJoin} 
          disable = {popupBtnDisable}
          error = {popupError}
        />
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