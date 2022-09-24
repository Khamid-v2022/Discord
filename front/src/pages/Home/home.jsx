import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logoImg from "../../res/imgs/Logo.png";
import discordImg from "../../res/imgs/discord2.png";

import HomeSvg from "../../res/svg/Home";
import AboutSvg from "../../res/svg/About";
import StarSvg from "../../res/svg/Star";
import MessageSvg from "../../res/svg/Message";
import DiscordSvg from "../../res/svg/Discord";
import InstagramSvg from "../../res/svg/Instagram";
import TwitterSvg from "../../res/svg/Twitter";
import MenuSvg from "../../res/svg/Menu";

import groupIconImg from "../../res/imgs/icongroup.png";
import leftGroupImg from "../../res/imgs/left_group.png";
import rightGroupImg from "../../res/imgs/right_group.png";
import screenGroup from "../../res/imgs/screengroup.png";
import toplineImg from "../../res/imgs/topline.png";

import usersImg from "../../res/imgs/users.png";
import serversImg from "../../res/imgs/servers.png";
import nftsImg from "../../res/imgs/nfts.png";

import reviewImg from "../../res/imgs/reviews.png";
import review1Img from "../../res/imgs/reviews_1.png";

import "./home.scss";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

// window size
import useWindowDim from "../../hooks/useWindowDim";

export default function Home() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname, hash, key]);
  return (
    <section id="home">
      <Header hashLink={hash} />
      <About />
      <Benefits />
      <Reviews />
      <Footer hashLink={hash} />
    </section>
  );
}

function Header({ hashLink }) {
  const hashi = hashLink.replace("#", "");
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(isActive => !isActive);
  };

  return (
    <div id="main">
      <nav>
        <div className="mobile-top-bar">
          <Link to="/" className="brand">
            <div>
              <img src={logoImg} alt="Linked Cord" />
              <h3>Linked Cord</h3>
            </div>
          </Link>
          <button className="burger" id="mobile_toggle" onClick={toggleNavbar}>
            <MenuSvg color="#75D10A" />
          </button>
        </div>
        <ul className={isActive?'d-inline-flex':'d-none'}>
          <li>
            <Link to="/" className={hashi === "" ? "active" : ""}>
              <HomeSvg color={hashi === "" ? "#75D10A" : "#383F56"} />
              <span>Main</span>
            </Link>
          </li>
          <li>
            <Link to="#about" className={hashi === "about" ? "active" : ""}>
              <AboutSvg color={hashi === "about" ? "#75D10A" : "#383F56"} />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="#benefits"
              className={hashi === "benefits" ? "active" : ""}
            >
              <StarSvg color={hashi === "benefits" ? "#75D10A" : "#383F56"} />
              <span>Benefits</span>
            </Link>
          </li>
          <li>
            <Link to="#reviews" className={hashi === "reviews" ? "active" : ""}>
              <MessageSvg color={hashi === "reviews" ? "#75D10A" : "#383F56"} />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>

        <a href="/login" id="connect"  className={isActive?'d-inline-flex':'d-none'}>
          <img src={discordImg} alt="discord" />
          <span>Connect Discord</span>
        </a>
      </nav>

      <div className="h-content">
        <div className="details">
          <h1>
            Create An Active <span className="green"> Discord Community </span>
            With Real Users in
            <span className="yellow"> 2-clicks</span>
          </h1>
          <p>
            Growing a discord server can be difficult, but it doesn’t to be.
            With X you can build not just a discord server, but create an active
            community with real users — all in just 2-clicks.
          </p>

          <a href="/login" className="login">
            <img src={discordImg} alt="discord" />
            <span>Connect Discord</span>
          </a>
        </div>
        <div className="img">
          <img src={groupIconImg} alt="groupIcon" />
        </div>
      </div>
    </div>
  );
}

function MiddleCard() {
  return (
    <div id="mid-card">
      <div className="left">
        <img src={leftGroupImg} alt="left group" />
      </div>

      <div className="details">
        <h2>
          Join <span className="yellow">3,284</span> Discord servers
        </h2>
        <p>building an active community with Linked Cord</p>
      </div>

      <div className="right">
        <img src={rightGroupImg} alt="left group" />
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <div className="a-content">
        <div className="img">
          <img src={screenGroup} alt="screenGroup" />
        </div>

        <div className="details">
          <h2>
            What is <span className="green">Linked Cord?</span>
          </h2>
          <p>
            Linked Cord is a discord community builder tool that helps servers
            increase their member count when they share links.
          </p>

          <a href="/login" className="login">
            <img src={discordImg} alt="discord" />
            <span>Connect Discord</span>
          </a>
        </div>
      </div>

      <MiddleCard />
    </section>
  );
}

function Benefits() {
  let { width, height } = useWindowDim();
  return (
    <section id="benefits">
      <div className="b-content">
        <div className="details">
          <h2>
            Why use <span className="yellow">Linked Cord?</span>
          </h2>

          <div className="topline">
            <img src={toplineImg} alt="topline" />
          </div>

          <p>
            Building a discord server and having an engaging community of active
            users is hard, but Linked Cord makes it simple — here’s why:
          </p>
        </div>

        {width > 426 ? (
          <div className="cards">
            <div className="card users">
              <div className="icon">
                <img src={usersImg} alt="users" />
              </div>

              <h3>
                Gain real active <br /> users
              </h3>

              <div className="topline">
                <img src={toplineImg} alt="topline" />
              </div>

              <p>
                Linked Cord helps you build a discord server with real active
                users willing to help your community grow
              </p>
            </div>

            <div className="card servers">
              <div className="icon">
                <img src={serversImg} alt="servers" />
              </div>

              <h3>
                Earn While You Join <br /> Servers
              </h3>

              <div className="topline">
                <img src={toplineImg} alt="topline" />
              </div>

              <p>
                Simply joining is the old way — how about you earn while doing
                it? With Linked Cord, you earn 1 coin for every server you join.
              </p>

              <p>
                <b>1 coin = 1 join</b> <br />
                The more servers you join, the more coins you earn.
              </p>
            </div>

            <div className="card nfts">
              <div className="icon">
                <img src={nftsImg} alt="nfts" />
              </div>

              <h3>
                Think NFTs. Think Easier <br /> Whitelisting
              </h3>

              <div className="topline">
                <img src={toplineImg} alt="topline" />
              </div>

              <div className="description">
                Getting into most NFT whitelists requires inviting users to the
                discord server — and we’ve made that easier. Hit your
                whitelisting goals in 3 steps:
                <ul>
                  <li>Create a new discord invitation link</li>
                  <li>Request the number of joins you need.</li>
                  <li>
                    Spend your coins by sharing your link to receive new joins
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Slider />
        )}
      </div>
    </section>
  );
}

function Slider() {
  let slideIndex = 1;

  const ShowDiv = (n) => {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dots");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" selected", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " selected";
  };

  useLayoutEffect(() => {
    ShowDiv(slideIndex);
  }, []);

  const currentDiv = (n) => {
    console.log(n);
    ShowDiv((slideIndex = n));
  };

  return (
    <>
      <div className="slider">
        <div className="slides">
          <div className="card users">
            <div className="icon">
              <img src={usersImg} alt="users" />
            </div>

            <h3>
              Gain real active <br /> users
            </h3>

            <div className="topline">
              <img src={toplineImg} alt="topline" />
            </div>

            <p>
              Linked Cord helps you build a discord server with real active
              users willing to help your community grow
            </p>
          </div>
        </div>
        <div className="slides">
          <div className="card servers">
            <div className="icon">
              <img src={serversImg} alt="servers" />
            </div>

            <h3>
              Earn While You Join <br /> Servers
            </h3>

            <div className="topline">
              <img src={toplineImg} alt="topline" />
            </div>

            <p>
              Simply joining is the old way — how about you earn while doing it?
              With Linked Cord, you earn 1 coin for every server you join.
            </p>

            <p style={{marginTop:20}}>
              <b style={{marginBottom:8}}>1 coin = 1 join</b> <br />
              The more servers you join, the more coins you earn.
            </p>
          </div>
        </div>
        <div className="slides">
          <div className="card nfts">
            <div className="icon">
              <img src={nftsImg} alt="nfts" />
            </div>

            <h3>
              Think NFTs. Think Easier <br /> Whitelisting
            </h3>

            <div className="topline">
              <img src={toplineImg} alt="topline" />
            </div>

            <div className="description">
              Getting into most NFT whitelists requires inviting users to the
              discord server — and we’ve made that easier. Hit your whitelisting
              goals in 3 steps:
              <ul>
                <li>Create a new discord invitation link</li>
                <li>Request the number of joins you need.</li>
                <li>
                  Spend your coins by sharing your link to receive new joins
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-button">
        <span className="dots" onClick={() => currentDiv(1)}></span>
        <span className="dots" onClick={() => currentDiv(2)}></span>
        <span className="dots" onClick={() => currentDiv(3)}></span>
      </div>
    </>
  );
}

function Reviews() {
  let { width, height } = useWindowDim();
  return (
    <section id="reviews">
      <div className="r-content">
        <div className="details">
          <h2>
            Ready To Grow Your Discord Server With{" "}
            <span className="green">Real Users</span>?
          </h2>
          <p>
            Join 3,284 Discord servers building an active community with Linked
            Cord.
          </p>
          <a href="/login" className="login">
            <img src={discordImg} alt="discord" />
            <span>Connect Discord</span>
          </a>
        </div>

        <div className="img">
          <img src={width > 426 ? reviewImg : review1Img} alt="reviews" />
        </div>
      </div>
    </section>
  );
}

function Footer({ hashLink }) {
  const [svgColors, setColor] = useState({
    discord: "#383F56",
    instagram: "#383F56",
    twitter: "#383F56",
  });
  const hashi = hashLink.replace("#", "");
  return (
    <footer>
      <div className="f-content">
        <Link to="/" className="brand">
          <div>
            <img src={logoImg} alt="Linked Cord" />
            <h3>Linked Cord</h3>
          </div>
        </Link>

        <ul>
          <li>
            <Link to="/" className={hashi === "" ? "active" : ""}>
              <HomeSvg color={hashi === "" ? "#75D10A" : "#383F56"} />
              <span>Main</span>
            </Link>
          </li>
          <li>
            <Link to="#about" className={hashi === "about" ? "active" : ""}>
              <AboutSvg color={hashi === "about" ? "#75D10A" : "#383F56"} />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="#benefits"
              className={hashi === "benefits" ? "active" : ""}
            >
              <StarSvg color={hashi === "benefits" ? "#75D10A" : "#383F56"} />
              <span>Benefits</span>
            </Link>
          </li>
          <li>
            <Link to="#reviews" className={hashi === "reviews" ? "active" : ""}>
              <MessageSvg color={hashi === "reviews" ? "#75D10A" : "#383F56"} />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>

        <div className="rights">
          <p>All rights reserved</p>
          <div className="social">
            <Link
              to="#"
              onMouseEnter={() => {
                setColor({ ...svgColors, discord: "#7bd812" });
              }}
              onMouseLeave={() => {
                setColor({ ...svgColors, discord: "#383F56" });
              }}
            >
              <DiscordSvg color={svgColors.discord} />
            </Link>
            <Link
              to="#"
              onMouseEnter={() => {
                setColor({ ...svgColors, instagram: "#7bd812" });
              }}
              onMouseLeave={() => {
                setColor({ ...svgColors, instagram: "#383F56" });
              }}
            >
              <InstagramSvg color={svgColors.instagram} />
            </Link>
            <Link
              to="#"
              onMouseEnter={() => {
                setColor({ ...svgColors, twitter: "#7bd812" });
              }}
              onMouseLeave={() => {
                setColor({ ...svgColors, twitter: "#383F56" });
              }}
            >
              <TwitterSvg color={svgColors.twitter} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
