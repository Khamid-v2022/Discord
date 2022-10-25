import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import Popup from "reactjs-popup";

import CoinSvg from "../../res/svg/Coin";
import DiamondSvg from "../../res/svg/Diamond";
import dollarImg from "../../res/imgs/dollar.png";
import arrowsImg from "../../res/imgs/arrows.png";
import questionImg from "../../res/imgs/questionmark.png";
import minusImg from "../../res/imgs/minus.png";
import plusImg from "../../res/imgs/plus2.png";
import toplineImg from "../../res/imgs/topline.png";

import "./replenish.scss";
import { useRef, useState } from "react";
import axios from "axios";
// import {
//   // PaymentElement,
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";


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
  // const stripe = useStripe();
  // const elements = useElements();
  const [diamond, setDiamond] = useState(1);
  const [payment, setPayment] = useState({
    coins: 0,
    diamonds: 0,
    amount: 0,
    plan: "",
  });

  const payPopup = useRef();
  // const closePopup = () => payPopup.current.close();
  const openPopup = () => payPopup.current.open();

  const paynow = (e) => {
    if (e.target.id === "basic") {
      setPayment({
        coins: 100,
        diamonds: 2,
        amount: 5,
        plan: "Basic",
      });
      openPopup();
    }
  };

  const diamondPay = async (e) => {
    let update = {
      diamonds: diamond,
      amound: diamond * 1.5
    }
    let url = '/api/payment/diamond';

    const response = await axios.post(url);
    const clientSecret = response.data.client_secret;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let url = `/api/payment/${payment.plan}`;
    
    const response = await axios.post(url);
    const clientSecret = response.data.client_secret;

    // confirm payment status
    // const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(),
    //   },
    // });
  };

  // basic plan
  // price_1KszAlEu7GyFTKQhdE3bM7on

  // standard plan
  // price_1KszCqEu7GyFTKQh9uDgekrg

  // premium plan
  // price_1KszDsEu7GyFTKQhIlVmh4IQ

  const contentStyle = { maxWidth: "250px" };

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

          <form
            className="content"
            action="/api/payment/checkoutsession"
            method="POST"
          >
            <div className="content">
              <input
                type="hidden"
                name="price_id"
                value="price_1KszAlEu7GyFTKQhdE3bM7on"
              />
              <div className="coin">
                <CoinSvg />
                <span>100</span>
              </div>

              <div className="diamond">
                <DiamondSvg />
                <span>2</span>
              </div>

              <button className="submit" id="basic" onClick={paynow}>
                <img src={dollarImg} alt="dollar" />
                <span>Buy $5</span>
              </button>
            </div>
          </form>
        </div>

        <div className="standard">
          <div className="head">
            <img src={toplineImg} alt="topline" />
            <h3>standard</h3>
            <img src={toplineImg} alt="topline" />
          </div>
          <form
            className="content"
            action="/api/payment/checkoutsession"
            method="POST"
          >
            <div className="content">
              <input
                type="hidden"
                name="price_id"
                value="price_1KszCqEu7GyFTKQh9uDgekrg"
              />
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
          </form>
        </div>

        <div className="premium">
          <div className="head">
            <img src={toplineImg} alt="topline" />
            <h3>premium</h3>
            <img src={toplineImg} alt="topline" />
          </div>
          <form
            className="content"
            action="/api/payment/checkoutsession"
            method="POST"
          >
            <div className="content">
              <input
                type="hidden"
                name="price_id"
                value="price_1KszDsEu7GyFTKQhIlVmh4IQ"
              />
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
          </form>
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
          {/* <form
            className="content"
            action="/api/payment/diamond"
            method="POST"
          > */}
            <div className="content">
              <div className="txt">
                <span>Conversion:</span>
                <h4>
                  <span>$1.5 = 1</span>
                  <DiamondSvg />
                </h4>
              </div>

              <div className="conversion">
                <button type="button" onClick={() => {
                  if(!parseInt(diamond)){
                    setDiamond(1);
                  }else{
                    if(diamond >= 2){
                      setDiamond(parseInt(diamond) - 1);
                    }
                  }
                }}>
                  <img src={minusImg} alt="leftArrow" />
                </button>
                <input type="number" value={diamond} onChange={e => setDiamond(e.target.value)}/>
                <button type="button" onClick={() => {
                  if(!parseInt(diamond)){
                    setDiamond(1);
                  }else{
                    setDiamond(parseInt(diamond) + 1);
                  }
                }}>
                  <img src={plusImg} alt="rightArrow" />
                </button>
              </div>

              <button className="submit" onClick={diamondPay}>
                <img src={dollarImg} alt="dollar" />
                <span>Buy ${diamond * 1.5}</span>
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>

    </section>
  );
}
