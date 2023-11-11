import { useState } from "react";
import "./css/dashboard.css";
import Header from "./Header";
import Recommendation from "./Recommendation";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Header headerName={"Dashboard"} />
      <div className="body">
        <CurrentDayWaste />
        <PeriodicWaste />
      </div>
    </main>
  );
}

function CurrentDayWaste() {
  const date = new Date();
  const [isRecommOpen, setRecommOpen] = useState(false);

  function handleClick() {
    setRecommOpen(true)
  }

  return (
    <>
      <div className="report-section" id="dashboard-current-day-report">
        <span className="report-heading">Current Day Waste Report</span>
        <button
          class="button-recom"
          id="button-current-day"
          onClick={handleClick}
        >
          Recommendations
        </button>

        {isRecommOpen && <Recommendation setRecommOpen={setRecommOpen}/>}
        
      </div>

      {/* For cards */}
      <div class="cards-section">
        <div class="date-card" id="card-cd-date">
          <h1 id="header-cd-date">
            <span>
              {date.toLocaleString("default", { month: "short" }).toUpperCase()}
            </span>
            <span>
              {date.getDay() < 10 ? "0" + date.getDay() : date.getDay()}
            </span>
          </h1>
        </div>

        <div className="cd-cards">
          <CurrentDayCard
            title={"Most Wasted Food Item"}
            subtitle={"(By Price)"}
            value={"MEAT"}
            subvalue={`PHP ${500}`}
          />
          <CurrentDayCard
            title={"Total Price of all Food Wastes"}
            value={`PHP ${1234}`}
          />

          <CurrentDayCard
            title={"Total Kilograms of Food Wastes"}
            value={`${4.5}`}
          />
        </div>
      </div>
    </>
  );
}

function CurrentDayCard({ title, subtitle, value, subvalue }) {
  return (
    <div className="card">
      {title && <h3 class="cd-card-title"> {title}</h3>}
      {subtitle && <h4 class="cd-card-subtitle">{subtitle}</h4>}
      {value && <h2 class="cd-card-value">{value}</h2>}
      {subvalue && <h4 class="cd-card-subvalue">{subvalue}</h4>}
    </div>
  );
}

function PeriodicWaste() {
  return (
    <div className="report-section" id="dashboard-periodic-report">
      <span className="report-heading">Periodic Waste Report</span>
      <button class="button-recom" id="button-periodic">
        Recommendations
      </button>
    </div>
  );
}
