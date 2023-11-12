import "./css/recommendation.css";
import { createPortal } from "react-dom";

//may pass data then set here the recommendations based on the data
//pass data props to Recommendation component in Dashboard.js

export default function Recommendation({ setRecommOpen , data }) {
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
