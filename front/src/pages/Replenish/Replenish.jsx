import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import Popup from "reactjs-popup";

import coinImg from "../../res/imgs/coin.png";
import diamondImg from "../../res/imgs/diamond.png";
import dollarImg from "../../res/imgs/dollar.png";
import arrowsImg from "../../res/imgs/arrows.png";
import questionImg from "../../res/imgs/questionmark.png";
import minusImg from "../../res/imgs/minus.png";
import plusImg from "../../res/imgs/plus2.png";

import "./replenish.scss";
export default function Replenish() {
  return (
    <section id="replenish">
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
  const contentStyle = { maxWidth: '250px' };
  return (
    <section id="replenish_page">
      <h2>Get More Coins</h2>
      <div className="replenish_cards">
        <div className="basic">
          <div className="head">
            <h3>Basic</h3>
          </div>

          <div className="content">
            <div className="coin">
              <img src={coinImg} alt="coin" />
              <span>100</span>
            </div>

            <div className="diamond">
              <img src={diamondImg} alt="diamond" />
              <span>2</span>
            </div>

            <button className="submit">
              <img src={dollarImg} alt="dollar" />
              <span>Buy $5</span>
            </button>
          </div>
        </div>

        <div className="standard">
          <div className="head">
            <h3>standard</h3>
          </div>

          <div className="content">
            <div className="coin">
              <div className="promotion">500+10%</div>
              <img src={coinImg} alt="coin" />
              <span>550</span>
            </div>

            <div className="diamond">
              <div className="promotion">10+10%</div>
              <img src={diamondImg} alt="diamond" />
              <span>11</span>
            </div>

            <button className="submit">
              <img src={dollarImg} alt="dollar" />
              <span>Buy $25</span>
            </button>
          </div>
        </div>

        <div className="premium">
          <div className="head">
            <h3>premium</h3>
          </div>

          <div className="content">
            <div className="coin">
              <div className="promotion">1000+20%</div>
              <img src={coinImg} alt="coin" />
              <span>1200</span>
            </div>

            <div className="diamond">
              <div className="promotion">20+20%</div>
              <img src={diamondImg} alt="diamond" />
              <span>24</span>
            </div>

            <button className="submit">
              <img src={dollarImg} alt="dollar" />
              <span>Buy $50</span>
            </button>
          </div>
        </div>

        <div className="transfer">
          <div className="line"></div>
          <div className="img">
            <img src={arrowsImg} alt="arrows" />
          </div>
          <div className="line"></div>
        </div>

        <div className="diamonds">
          <div className="question">
            <Popup
              className="replenish"
              trigger={(open) => (
                <button>
                  <img src={questionImg} alt="question" />
                </button>
              )}
              {...{contentStyle}}
              on={["hover"]}
              position={`top right`}
              closeOnDocumentClick
            >
              <span className="mytooltip">
                Diamonds are used to promote your discord server. It will be
                prioritized to clients who join Discord Servers. Every 50 Coins,
                1 Diamond is Used
              </span>
            </Popup>
          </div>

          <div className="head">
            <h3>buy diamonds</h3>
          </div>

          <div className="content">
            <div className="txt">
              <span>Conversion:</span>
              <h4>
                <span>$1.5 = 1</span>
                <img src={diamondImg} alt="diamond" />
              </h4>
            </div>

            <div className="conversion">
              <button>
                <img src={minusImg} alt="leftArrow" />
              </button>
              <input type="number" />
              <button>
                <img src={plusImg} alt="rightArrow" />
              </button>
            </div>

            <button className="submit">
              <img src={dollarImg} alt="dollar" />
              <span>Buy $5</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
