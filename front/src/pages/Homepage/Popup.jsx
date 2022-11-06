import Popup from "reactjs-popup";
import "./popup.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default function CheckPopup({open, closePopup, checkingJoin, disable, error}) {
  const closeModal = () => {
    closePopup();
  };

  const checkJoin = () => {
    checkingJoin();
  }

  return (
    <section>
      <Popup open={open} className="checkingpopup" closeOnDocumentClick={false}>
        <div className="modal">
          <div className="head">
            <h3>Checking</h3>
          </div>

          <div className="content">
            <div className="rows">
              Please make sure you are joined up for Discord server.          
            </div>
            <div className="button-group">
                <button onClick={closeModal}>No, I won't join</button>
                <button onClick={checkJoin} disabled={disable}>
                  Yes
                  {disable ? ( <FontAwesomeIcon icon={faSpinner } /> ) : ""}
                </button>
            </div>
            <div className="error-msg">
                {error}
            </div>
          </div>
        </div>
      </Popup>
    </section>
  );
}
