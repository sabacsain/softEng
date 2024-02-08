import "./css/recommendation.css";
import { createPortal } from "react-dom";

//may pass data then set here the recommendations based on the data
//pass data props to Recommendation component in Dashboard.js

export default function Recommendation({ setRecommOpen, mostWastedFood, totalWastePrice, totalWasteKgs }) {

  function HandleClick() {
    setRecommOpen(false);
  }

  function generateRecommendations() {
    const recommendations = [];

    // Recommendation based on the most wasted food item
    if (mostWastedFood != "None") {
      recommendations.push(`Try to reduce waste of ${mostWastedFood}.`);
    }

    // Recommendation based on the total price of wasted food
    if (totalWastePrice > 0) {
      recommendations.push(`Monitor purchases and consumption to reduce waste and save money.`);
    }

    // Recommendation based on the total kilograms of waste 
    if (totalWasteKgs > 0) {
      recommendations.push(`Consider donating excess food to reduce waste and help those in need.`);
    }

    ///Mema pa lang yung messages saka threshhold ^^^

    return recommendations;
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
          {generateRecommendations().map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
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