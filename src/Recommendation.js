import "./css/recommendation.css";
import { createPortal } from "react-dom";

export default function Recommendation({ setRecommOpen }) {
  function handleClick() {
    setRecommOpen(false);
  }

  return createPortal(
    <>
      <div class="recomm-overlay"></div>
      <div className="recomm-container">
        recomm UNDER CONSTRUCTION
        <button onClick={handleClick}>CLOSSSEE</button>
      </div>
    </>,

    document.getElementById("portal")
  );
}
