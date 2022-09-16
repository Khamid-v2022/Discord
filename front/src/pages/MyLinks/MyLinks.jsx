import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import Popup from "reactjs-popup";
import { useState } from "react";

import discordImg from "../../res/imgs/discord2.png";
import searchImg from "../../res/imgs/search.png";
import pauseImg from "../../res/imgs/pause.png";
import resumeImg from "../../res/imgs/resume.png";
import reloadImg from "../../res/imgs/return.png";
import questionImg from "../../res/imgs/questionmark.png";
import coinImg from "../../res/imgs/coin.png";
import leftArrowImg from "../../res/imgs/leftarrow.png";
import rightArrowImg from "../../res/imgs/rightarrow.png";
import diamondImg from "../../res/imgs/diamond.png";

import "./mylinks.scss";
export default function MyLinks() {
  return (
    <section id="mylink">
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
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <section id="links_data">
      <div className="top">
        <h2>My Links</h2>

        <div className="search">
          <img src={searchImg} alt="search" />
          <input
            type="search"
            name="query"
            id="query"
            placeholder="Search ID or Discord Link..."
          />
        </div>

        <div className="newlink">
          <NewCampaign setOpen={setOpen} open={open} closeModal={closeModal} />
        </div>
      </div>

      <div className="table">
        <Table />
      </div>
    </section>
  );
}

function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Discord Link</th>
          <th>Status</th>
          <th>Joins</th>
          <th>Started Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <span>102</span>
          </td>
          <td>https://discord.gg/GU4as657</td>
          <td className="yellow">Active</td>
          <td className="progress">
            <div className="pr">
              <div className="bar pr-yellow"></div>
            </div>
            <span>17/25</span>
          </td>
          <td>2022/02/25 - 12-22</td>
          <td className="actions">
            <Popup
              className="mylinks"
              trigger={(open) => (
                <button id="pause">
                  <img src={pauseImg} alt="pause" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Stop the Joinings</span>
            </Popup>
          </td>
        </tr>
        <tr>
          <td>
            <span>102</span>
          </td>
          <td>https://discord.gg/GU4as657</td>
          <td className="gray">Inactive</td>
          <td className="progress">
            <div className="pr">
              <div className="bar pr-gray"></div>
            </div>
            <span>17/25</span>
          </td>
          <td>2022/02/25 - 12-22</td>
          <td className="actions">
            <Popup
              className="mylinks"
              trigger={(open) => (
                <button id="resume">
                  <img src={resumeImg} alt="resume" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Resume the Joinings</span>
            </Popup>

            <Popup
              className="mylinks"
              trigger={(open) => (
                <button id="reload">
                  <img src={reloadImg} alt="reload" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Refund 8 Coins and 0 Diamond</span>
            </Popup>
          </td>
        </tr>
        <tr>
          <td>
            <span>102</span>
          </td>
          <td>https://discord.gg/GU4as657</td>
          <td className="green">Complete</td>
          <td className="progress">
            <div className="pr ">
              <div className="bar pr-green"></div>
            </div>
            <span>17/25</span>
          </td>
          <td>2022/02/25 - 12-22</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

function NewCampaign({ setOpen, open, closeModal }) {
  return (
    <div>
      <button
        type="button"
        className="button"
        onClick={() => setOpen((o) => !o)}
      >
        <img src={discordImg} alt="discord" />
        <span>Add Discord Link</span>
      </button>

      <Popup
        open={open} closeOnDocumentClick onClose={closeModal} className="mylinks">
        {/* <a className="close" onClick={closeModal}>
          &times;
        </a> */}
        <div className="modal">
          <div className="head">
            <h3>Add Discord Link</h3>
          </div>

          <div className="content">
            <p>
              <span>Discord Link</span> <img src={questionImg} alt="question" />
            </p>

            <div className="input_group">
              <input type="url" />
            </div>

            <div className="campaign">
              <div className="coins">
                <h5>How many users:</h5>
                <p>
                  <span>1 user = 1</span> <img src={coinImg} alt="coin" />
                </p>

                <div className="selection">
                  <button>
                    <img src={leftArrowImg} alt="leftArrow" />
                  </button>
                  <input type="number" />
                  <button>
                    <img src={rightArrowImg} alt="rightArrow" />
                  </button>
                </div>
              </div>

              <div className="diamond">
                <h5>Promote my server:</h5>
                <p>Cost 1 Diamond every 50 Coin</p>

                <div className="selection">
                  <label htmlFor="diamonds">
                    <span>Cost: x1</span> <img src={diamondImg} alt="diamond" />
                  </label>
                  <input type="checkbox" id="diamonds" />
                </div>
              </div>
            </div>

            <button className="submit">Add Discord Link</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
