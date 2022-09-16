import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import serverImg from "../../res/imgs/serverimg.png";
import coinImg from "../../res/imgs/coin.png";

import "./homepage.scss";
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

function PageContent() {
  return (
    <section id="server_joining">
      <div className="thumbnail">
        <img src={serverImg} alt="server" />
      </div>

      <div className="details">
        <p>You've been inviting to join</p>
        <h1>Fortnite Discord</h1>
      </div>

      <div className="progress">
        <div className="progressbar">
          <div className="bar"></div>
        </div>
        <p>
          <span>24 sec</span> left to make a decision
        </p>
      </div>

      <div className="actions">
        <button className="skip">Skip to next one</button>

        <button className="join">
          <img src={coinImg} alt="coin" />
          <span>Join and earn 1 coin</span>
        </button>
      </div>
    </section>
  );
}
