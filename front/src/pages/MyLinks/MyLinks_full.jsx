import Sidebar from "../../component/Sidebar/Sidebar";
import Header from "../../component/Header/Header";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBalance } from "../../redux/reducers/userBalance";
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
import axios from "axios";
// window size
import useWindowDim from "../../hooks/useWindowDim";

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

const sampleData = [
  {
    link: "https://Discord..",
    status: "Complete",
    target: {
      achieved: 50,
      total: 100
    },
    created_at: "2022-09-26"
  },
  {
    link: "https://Discord..",
    status: "Active",
    target: {
      achieved: 50,
      total: 100
    },
    created_at: "2022-09-26"
  },
  {
    link: "https://Discord..",
    status: "Inactive",
    target: {
      achieved: 50,
      total: 100
    },
    created_at: "2022-09-26"
  }
];

function PageContent() {
  let { width, height } = useWindowDim();

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getlist() {
      // setData(sampleData);
      // console.log(sampleData);
      const response = await axios.get("/api/invite");
      setData(response.data);
    }
    getlist();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <section id="links_data">
      <div className="top">
        <h2>My Links</h2>

        <div className="search">
          <img src={searchImg} alt="search" />
          <input
            value={search}
            type="text"
            name="query"
            id="query"
            placeholder="Search ID or Discord Link..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="newlink">
          <NewCampaign
            setOpen={setOpen}
            open={open}
            closeModal={closeModal}
            setRows={setData}
          />
        </div>
      </div>

      {width > 426 ? (
        <div className="table">
          <Table data={data} setData={setData} searchTerm={search} />
        </div>
      ) : (
        <div className="mtable">
          <MTable data={data} setData={setData} searchTerm={search} />
        </div>
      )}
    </section>
  );
}

// desktop table
function Table({ data, setData, searchTerm }) {
  let index = 0;
  return (
    <>
      {data.length > 0 ? (
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
            {data
              .filter((item) => {
                if (searchTerm == "") {
                  return item;
                } else if (item.link.includes(searchTerm)) {
                  return item;
                }
              })
              .map((row, id) => {
                index = index + 1;
                return (
                  <TableRow
                    item={row}
                    key={id}
                    setData={setData}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="notdata">
          <p>You dont have any Campaings</p>
        </div>
      )}
    </>
  );
}

function TableRow({ item, setData, index }) {
  const dispatch = useDispatch();
  const updateHandler = async (_id, status) => {
    const response = await axios.post("/api/invite/update", {
      _id,
      status,
    });
    console.log(response);
    if (response.status != 400) {
      setData(response.data);
      // check balance
      const response2 = await axios.get("/api/user/getbalance");
      if (response2.status != 401) {
        dispatch(updateBalance(response2.data));
      }
    }
  };

  return (
    <tr>
      <td>
        <span>{index}</span>
      </td>
      <td>{item.link}</td>
      <td
        className={`
       ${item.status === "Complete" ? "green" : ""}
       ${item.status === "Active" ? "yellow" : ""}
       ${item.status === "Inactive" ? "gray" : ""}
       `}
      >
        {item.status}
      </td>
      <td className="progress">
        <div className="pr">
          <div
            style={{
              width: `${(
                (item.target.achieved * 100) /
                item.target.total
              ).toFixed(2)}%`,
            }}
            className={`bar
                 ${item.status === "Complete" ? "pr-green" : ""}
                 ${item.status === "Active" ? "pr-yellow" : ""}
                 ${item.status === "Inactive" ? "pr-gray" : ""}
          `}
          ></div>
        </div>
        <span>
          {item.target.achieved}/{item.target.total}
        </span>
      </td>

      <td>
        {new Date(item.created_at).getFullYear() +
          "/" +
          new Date(item.created_at).getMonth() +
          "/" +
          new Date(item.created_at).getDay() +
          " - " +
          (new Date(item.created_at).getHours() > 12
            ? new Date(item.created_at).getHours() - 13
            : new Date(item.created_at).getHours()) +
          "-" +
          new Date(item.created_at).getMinutes()}
      </td>
      <td className="actions">
        {item.status === "Inactive" ? (
          <Popup
            className="mylinks"
            trigger={(open) => (
              <button
                id="resume"
                onClick={() => {
                  updateHandler(item._id, "Active");
                }}
              >
                <img src={resumeImg} alt="resume" />
              </button>
            )}
            on={["hover"]}
            position={`top center`}
            closeOnDocumentClick
          >
            <span className="mytooltip">Resume the Joinings</span>
          </Popup>
        ) : (
          ""
        )}

        {item.status === "Active" ? (
          <Popup
            className="mylinks"
            trigger={(open) => (
              <button
                id="pause"
                onClick={() => {
                  updateHandler(item._id, "Inactive");
                }}
              >
                <img src={pauseImg} alt="pause" />
              </button>
            )}
            on={["hover"]}
            position={`top center`}
            closeOnDocumentClick
          >
            <span className="mytooltip">Stop the Joinings</span>
          </Popup>
        ) : (
          ""
        )}

        {item.status === "Inactive" ? (
          <Popup
            className="mylinks"
            trigger={(open) => (
              <button
                id="reload"
                onClick={() => {
                  updateHandler(item._id, "Refunded");
                }}
              >
                <img src={reloadImg} alt="Refund" />
              </button>
            )}
            on={["hover"]}
            position={`top center`}
            closeOnDocumentClick
          >
            <span className="mytooltip">Refund 8 Coins and 0 Diamond</span>
          </Popup>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
}

// mobile table
function MTable({ data, setData, searchTerm }) {
  let index = 0;
  return (
    <>
      {data.length > 0 ? (
        data
          .filter((item) => {
            if (searchTerm == "") {
              return item;
            } else if (item.link.includes(searchTerm)) {
              return item;
            }
          })
          .map((row, id) => {
            index = index + 1;
            return (
              <MTableRow item={row} key={id} setData={setData} index={index} />
            );
          })
      ) : (
        <div className="notdata">
          <p>You dont have any Campaings</p>
        </div>
      )}
    </>
  );
}

function MTableRow({ item, setData, index }) {
  const dispatch = useDispatch();
  const updateHandler = async (_id, status) => {
    const response = await axios.post("/api/invite/update", {
      _id,
      status,
    });
    console.log(response);
    if (response.status != 400) {
      setData(response.data);
      // check balance
      const response2 = await axios.get("/api/user/getbalance");
      if (response2.status != 401) {
        dispatch(updateBalance(response2.data));
      }
    }
  };

  return (
    <div className="box">
      <div className="top">
        <div className="index">
          <span>{index}</span>
        </div>

        <div className="actions">
          {item.status === "Inactive" ? (
            <Popup
              className="mylinks"
              trigger={(open) => (
                <button
                  id="resume"
                  onClick={() => {
                    updateHandler(item._id, "Active");
                  }}
                >
                  <img src={resumeImg} alt="resume" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Resume the Joinings</span>
            </Popup>
          ) : (
            ""
          )}

          {item.status === "Active" ? (
            <Popup
              className="mylinks"
              trigger={(open) => (
                <button
                  id="pause"
                  onClick={() => {
                    updateHandler(item._id, "Inactive");
                  }}
                >
                  <img src={pauseImg} alt="pause" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Stop the Joinings</span>
            </Popup>
          ) : (
            ""
          )}

          {item.status === "Inactive" ? (
            <Popup
              className="mylinks"
              trigger={(open) => (
                <button
                  id="reload"
                  onClick={() => {
                    updateHandler(item._id, "Refunded");
                  }}
                >
                  <img src={reloadImg} alt="Refund" />
                </button>
              )}
              on={["hover"]}
              position={`top center`}
              closeOnDocumentClick
            >
              <span className="mytooltip">Refund 8 Coins and 0 Diamond</span>
            </Popup>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="progress">
        <div className="pr">
          <div
            style={{
              width: `${(
                (item.target.achieved * 100) /
                item.target.total
              ).toFixed(2)}%`,
            }}
            className={`bar
                 ${item.status === "Complete" ? "pr-green" : ""}
                 ${item.status === "Active" ? "pr-yellow" : ""}
                 ${item.status === "Inactive" ? "pr-gray" : ""}
          `}
          ></div>
        </div>
      </div>

      <div className="link">
        <span>Discord Link:</span>
        <a href={item.link} target="_blank">
          {item.link}
        </a>
      </div>

      <div className="bottom">
        <div>
          <span>Status</span>
          <span
            className={`
              ${item.status === "Complete" ? "green" : ""}
              ${item.status === "Active" ? "yellow" : ""}
              ${item.status === "Inactive" ? "gray" : ""}
             `}
          >
            {item.status}
          </span>
        </div>

        <div className="joins">
          <span>Joins</span>
          <span>
            {item.target.achieved}/{item.target.total}
          </span>
        </div>

        <div className="">
          <span>Started Date</span>
          <span>
            {" "}
            {new Date(item.created_at).getFullYear() +
              "/" +
              new Date(item.created_at).getMonth() +
              "/" +
              new Date(item.created_at).getDay() +
              " - " +
              new Date(item.created_at).getHours() +
              "-" +
              new Date(item.created_at).getMinutes()}
          </span>
        </div>
      </div>
    </div>
  );
}

function NewCampaign({ setOpen, open, closeModal, setRows }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    link: "",
    target: 0,
    fast: true,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setOpen((o) => !o);

    if (data.link !== "" || data.target > 0) {
      const response = await axios.post("/api/invite/add", data);
      const resData = response.data;
      console.log(response);
      if (response.status === 201) {
        // updating balance
        dispatch(updateBalance(resData.earning));

        setRows((prev) => {
          return [...prev, resData.invite];
        });
      }
    } else {
      alert("Please try again with correct details.");
    }
  };
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
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        className="mylinks"
      >
        <div className="modal">
          <a className="close" onClick={() => setOpen((o) => !o)}>
            x
          </a>

          <div className="head">
            <h3>Add Discord Link</h3>
          </div>

          <form onSubmit={submitHandler}>
            <div className="content">
              <p>
                <span>Discord Link</span>{" "}
                <img src={questionImg} alt="question" />
              </p>

              <div className="input_group">
                <input
                  placeholder="https://discord.gg/xxxxxx"
                  type="url"
                  value={data.link}
                  onChange={(e) => {
                    setData((prev) => {
                      return { ...prev, link: e.target.value };
                    });
                  }}
                />
              </div>

              <div className="campaign">
                <div className="coins">
                  <h5>How many users:</h5>
                  <p>
                    <span>1 user = 1</span> <img src={coinImg} alt="coin" />
                  </p>

                  <div className="selection">
                    <button
                      type="button"
                      onClick={() => {
                        setData((prev) => {
                          return { ...prev, target: parseInt(prev.target) - 1 };
                        });
                      }}
                    >
                      <img src={leftArrowImg} alt="leftArrow" />
                    </button>
                    <input
                      type="number"
                      value={data.target}
                      onChange={(e) => {
                        setData((prev) => {
                          return { ...prev, target: e.target.value };
                        });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setData((prev) => {
                          return { ...prev, target: parseInt(prev.target) + 1 };
                        });
                      }}
                    >
                      <img src={rightArrowImg} alt="rightArrow" />
                    </button>
                  </div>
                </div>

                <div className="diamond">
                  <h5>Promote my server:</h5>
                  <p>Cost 1 Diamond every 50 Coin</p>

                  <div className="selection">
                    <label htmlFor="diamonds">
                      <span>Cost: x1</span>{" "}
                      <img src={diamondImg} alt="diamond" />
                    </label>
                    <input
                      type="checkbox"
                      id="diamonds"
                      value={true}
                      onChange={(e) => {
                        setData((prev) => {
                          return { ...prev, fast: !prev.fast };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <button className="submit" type="submit">
                Add Discord Link
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
}
