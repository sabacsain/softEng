import "./css/recommendation.css";
import { createPortal } from "react-dom";

//may pass data then set here the recommendations based on the data
//pass data props to Recommendation component in Dashboard.js

export default function Recommendation({ setRecommOpen, data }) {
  //sample
  const exceededThreshold = true;

  function HandleClick() {
    setRecommOpen(false);
  }

  return createPortal(
    <>
      <div class="recomm-overlay"></div>
      <div className="recomm-container">
        <p className={`recomm-result`}>
          Recommendations
        </p>
        <p className="recomm-summary">
            Here are the following recommendations to reduce your food waste:{" "}
        </p>
        <ul className="recommendations-wrapper">
              <li>Promote Sustainable Preparation</li>
              <li>Avoid Over-Preparing for Food Waste Reduction</li>
              <li>Improve Your Inventory Management</li>
              <li>Store Food Properly</li>
              <li>Calculate and Control Inventory Days on Hand</li>
              <li>Repurpose Ingredients</li>
              <li>Identify Multi-Use Menu Items</li>
              <li>Order In-Season</li>
              <li>Reduce Portion Sizes for Food Waste Management</li>
        </ul>
        <button className="recomm-close-btn" onClick={HandleClick}>
          {" "}
          ✖
        </button>
      </div>
    </>,

    document.getElementById("portal")
  );
}
