import Popup from "reactjs-popup";
import "./guide.scss";

import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/reducers/guidePopup";
export default function Guid() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.guide.isOpen);

  const closeModal = () => {
    dispatch(update());
  };

  return (
    <section id="guide">
      <Popup open={open} closeOnDocumentClick className="guide">
        <div className="modal">
          <div className="head">
            <h3>Usage guide</h3>
          </div>

          <div className="content">
            <div className="rows">
              <div className="row">
                <div className="indicator">
                  <span>1</span>
                </div>
                <p>
                  Earn <span className="yellow">Coins</span> by joining other
                  Discords
                </p>
              </div>

              <div className="row">
                <div className="indicator">
                  <span>2</span>
                </div>
                <p>
                  Spend <span className="yellow">Coins</span> by sharing your
                  Discord Invite link
                </p>
              </div>

              <div className="row">
                <div className="indicator">
                  <span>3</span>
                </div>
                <p>
                  Get users to join your Discord faster by using{" "}
                  <span className="purple">Diamonds</span>
                </p>
              </div>
            </div>

            <button onClick={closeModal}>Okay, got it!</button>
          </div>
        </div>
      </Popup>
    </section>
  );
}
