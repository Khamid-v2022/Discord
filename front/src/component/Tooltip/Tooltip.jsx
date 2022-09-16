import Popup from "react-popup";

export default function Tooltip({ txt, pos }) {
  return (
    <Popup
      trigger={(open) => (
        <button className="button">
          Trigger - {open ? "Opened" : "Closed"}
        </button>
      )}
      position={`top ${pos}`}
      closeOnDocumentClick
    >
      <span> {txt} </span>
    </Popup>
  );
}
