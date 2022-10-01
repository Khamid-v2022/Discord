import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import Popup from "reactjs-popup";

import CoinSvg from "../../res/svg/Coin";
import DiamondSvg from "../../res/svg/Diamond";
import diamondImg from "../../res/imgs/diamond.png";
import dollarImg from "../../res/imgs/dollar.png";
import arrowsImg from "../../res/imgs/arrows.png";
import questionImg from "../../res/imgs/questionmark.png";
import minusImg from "../../res/imgs/minus.png";
import plusImg from "../../res/imgs/plus2.png";
import toplineImg from "../../res/imgs/topline.png";

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
            <img src={toplineImg} alt="topline" />
            <h3>Basic</h3>
            <img src={toplineImg} alt="topline" />
          </div>

          <div className="content">
            <div className="coin">
              <CoinSvg />
              <span>100</span>
            </div>

            <div className="diamond">
              <DiamondSvg />
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
            <img src={toplineImg} alt="topline" />
            <h3>standard</h3>
            <img src={toplineImg} alt="topline" />
          </div>

          <div className="content">
            <div className="coin">
              <div className="promotion">500+10%</div>
              <CoinSvg/>
              <span>550</span>
            </div>

            <div className="diamond">
              <div className="promotion">10+10%</div>
              <DiamondSvg />
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
            <img src={toplineImg} alt="topline" />
            <h3>premium</h3>
            <img src={toplineImg} alt="topline" />
          </div>

          <div className="content">
            <div className="coin">
              <div className="promotion">1000+20%</div>
              <CoinSvg/>
              <span>1200</span>
            </div>

            <div className="diamond">
              <div className="promotion">20+20%</div>
              <DiamondSvg />
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
            <img src={toplineImg} alt="topline" />
            <h3>buy diamonds</h3>
            <img src={toplineImg} alt="topline" />
          </div>

          <div className="content">
            <div className="txt">
              <span>Conversion:</span>
              <h4>
                <span>$1.5 = 1</span>
                {/* <img src={diamondImg} alt="diamond" /> */}
                <DiamondSvg />
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
