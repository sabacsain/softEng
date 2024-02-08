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
    if (mostWastedFood.foodItem != "None" && mostWastedFood.foodItem != "No waste") {
      if (mostWastedFood.foodItemPrice <= 100) {
        recommendations.push(`There is a small waste of ${mostWastedFood.foodItem}. Try to buy slightly reduced amounts of this ingredient`);
      } else if (mostWastedFood.foodItemPrice <= 250) {
        recommendations.push(`There is a moderate waste of ${mostWastedFood.foodItem}. Try to buy reduced amounts of this ingredient`);
        recommendations.push(`Consider repurposing excess of ${mostWastedFood.foodItem}.`);
      } else if (mostWastedFood.foodItemPrice > 250) {
        recommendations.push(`There is a large waste of ${mostWastedFood.foodItem}. Try to buy greatly reduced amounts of this ingredient.`);
        recommendations.push(`Consider repurposing excess of ${mostWastedFood.foodItem}.`);
        recommendations.push(`Try to offer specials or discounts of dishes that use ${mostWastedFood.foodItem}.`);
      }
    }

    // Recommendation based on the total price of wasted food
    if (totalWastePrice <= 250) {
      recommendations.push('There is a small amount of wasted money. Consider leniently monitoring purchases and slightly cut down on costs.');
    } else if (totalWastePrice <= 500) {
      recommendations.push('There is a moderate amount of wasted money. Consider monitoring purchases and cut down on costs');
      recommendations.push('Try to order ingredients that are in season since they are more fresh and cost less');
    } else if (totalWastePrice > 500) {
      recommendations.push('There is a large amount of wasted money. Consider strictly monitoring purchases and cut greatly down on costs');
      recommendations.push('Try to order ingredients that are in season since they are more fresh and cost less');
      recommendations.push('Optimize the menu by replacing dishes that do not sell well and replace them with cost efficient dishes');
    }
    

    // Recommendation based on the total kilograms of waste 
    if (totalWasteKgs <= 10) {
      recommendations.push('There is a light waste of food. Consider leniently monitoring the inventory');
    } else if (totalWasteKgs <= 25) {
      recommendations.push('There is a moderate waste of food. Consider monitoring the inventory and plan portion control to minimize leftovers');
    } else if (totalWasteKgs > 25) {  
      recommendations.push('There is a heavy waste of food. Consider strictly monitoring the inventory and plan portion control to minimize leftovers.');
      recommendations.push('Consider donating surplus food that were not sold to help those in need, and try to compost food waste as well to help the environment');
    }

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
