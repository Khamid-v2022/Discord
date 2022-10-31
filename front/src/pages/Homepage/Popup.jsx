import Popup from "reactjs-popup";
import "./popup.scss";


export default function CheckPopup({open, closePopup, checkingJoin, disable, error}) {
//   const [open, setOpen] = useState(true);

  const closeModal = () => {
    closePopup();
  };

  const checkJoin = () => {
    checkingJoin();
  }

  return (
    <section id="guide">
      <Popup open={open} className="guide" closeOnDocumentClick={false}>
        <div className="modal">
          <div className="head">
            <h3>Checking</h3>
          </div>

          <div className="content">
            <div className="rows">
              <div className="row">
                <p>
                    Please make sure you are joined up for Discord server.
                </p>
              </div>            
            </div>
            <div className="button-group">
                <button onClick={closeModal}>No, I won't join</button>
                <button onClick={checkJoin} disabled={disable}>Yes</button>
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
