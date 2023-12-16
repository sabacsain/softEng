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
        {/* if nag-exceed, add 'exceeded' class */}
        <p className={`recomm-result ${exceededThreshold ? "exceeded" : ""}`}>
          Threshold Not Exceeded
        </p>

        {/* if threshold was not exceeded, execute this */}
        {!exceededThreshold && (
          <p className="recomm-summary">
            Congratulations! The amount of waste generated for the time period
            is within the recommended threshold! All steps that the company is
            doing for waste reduction have been effective. Keep up the good
            work!{" "}
          </p>
        )}

        {/* if threshold was exceeded, execute this */}
        {exceededThreshold && (
          <>
            <p className="recomm-summary">
              The amount of wastes generated for the time period exceeded the
              recommended threshold. Consider the following recommendations for
              reducing wastes:
            </p>

            <ul className="recommendations-wrapper">
              <li>Insert Recommendation</li>
              <li>Insert Recommendation</li>
              <li>Insert Recommendation</li>
            </ul>
          </>
        )}

        <button className="recomm-close-btn" onClick={HandleClick}>
          {" "}
          ✖
        </button>
      </div>
    </>,

    document.getElementById("portal")
  );
}
