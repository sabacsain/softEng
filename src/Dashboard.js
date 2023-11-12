import { useState } from "react";
import "./css/dashboard.css";
import Header from "./Header";
import Recommendation from "./Recommendation";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

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

// CURRENT DAY WASTE SECTION
function CurrentDayWaste() {
  const date = new Date();
  const [isRecommOpen, setRecommOpen] = useState(false);

  function handleClick() {
    setRecommOpen(true);
  }

  return (
    <div className="report-section" id="dashboard-current-day-report">
      {/*For heading*/}
      <div>
        <span className="report-heading">Current Day Waste Report</span>
        <button
          class="button-recom"
          id="button-current-day"
          onClick={handleClick}
        >
          Recommendations
        </button>

        {/* If recomm button is clicked, open modal */}
        {isRecommOpen && <Recommendation setRecommOpen={setRecommOpen} />}
      </div>

      {/* For cards */}
      <div class="cards-section">
        <div class="date-card" id="card-cd-date">
          <h1 id="header-cd-date">
            <span>
              {date.toLocaleString("default", { month: "short" }).toUpperCase()}
            </span>
            <span>
              {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
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
    </div>
  );
}

function CurrentDayCard({ title, subtitle, value, subvalue }) {
  return (
    <div className="card">
      {title && <h3 className="cd-card-title"> {title}</h3>}
      {subtitle && <h4 className="cd-card-subtitle">{subtitle}</h4>}
      {value && <h2 className="cd-card-value">{value}</h2>}
      {subvalue && <h4 className="cd-card-subvalue">{subvalue}</h4>}
    </div>
  );
}

//PERIODIC WASTE SECTION
function DateRangeForm() {
  //either lastyear, last month, last week, or CUSTOM
  const [selectedRange, setSelectedRange] = useState("last-year");

  //date range variable contains the start and end date (can be used for query)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //tracks if calendar is open
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  //sets the date ranges for last year, last month, last week
  function handleSelectedRangeChange(selectedRange) {
    setSelectedRange((s) => selectedRange);

    //sets the initial date range depending on the chosen range (last yr, month, week, custom)
    switch (selectedRange) {
      case "last-year":
        setDateRange([
          {
            startDate: new Date(
              new Date().setFullYear(new Date().getFullYear() - 1) //start date is 1 yr ago
            ),
            endDate: new Date(),
            key: "selection",
          },
        ]);
        break;

      case "last-month":
        setDateRange([
          {
            startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), //start date is a month ago
            endDate: new Date(),
            key: "selection",
          },
        ]);
        break;

      case "last-week":
        setDateRange([
          {
            startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //start date is 7 days ago
            endDate: new Date(),
            key: "selection",
          },
        ]);
        break;

      default:
        setDateRange([
          {
            startDate: new Date(
              new Date().setFullYear(new Date().getFullYear()) //if chosen range is custom
            ),
            endDate: new Date(),
            key: "selection",
          },
        ]);
        setIsCalendarOpen(false);
    }
  }

  function handleDateRangeChange(range) {
    setDateRange([range.selection]);
  }

  return (
    <>
      <div className="main-range-container">
        <label for="date-range">Date range:</label>
        <select
          id="date-range"
          onChange={(e) => handleSelectedRangeChange(e.target.value)}
        >
          <option value="last-year">Last Year</option>
          <option value="last-month">Last Month</option>
          <option value="last-week">Last Week</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="date-range-picker-container">
        <label for="actual-date-range">Start Date - End Date</label>

        <div
          //if selected range is custom, make date clickable to open and close calendar
          className={`${selectedRange === "custom" ? "clickable" : " "} `}
          id="actual-date-range"
          onClick={() => setIsCalendarOpen((previous) => !previous)}
        >
          {`${format(dateRange[0].startDate, "MMM dd yyy")} - ${format(
            dateRange[0].endDate,
            "MMM dd yyy"
          )}`}
        </div>

        {selectedRange === "custom" && !isCalendarOpen && (
          <div className="calendar-container">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              maxDate={new Date()}
            />
          </div>
        )}
      </div>
    </>
  );
}

function PeriodicWaste() {
  //tracks if recomm modal is open
  const [isRecommOpen, setRecommOpen] = useState(false);

  function handleClick() {
    setRecommOpen(true);
  }

  return (
    <div className="report-section" id="dashboard-periodic-report">
      <div className="report-sec-heading">
        {/* For heading */}
        <div className="report-heading-container">
          <span className="report-heading">Periodic Waste Report</span>
          <button
            class="button-recom"
            id="button-periodic"
            onClick={handleClick}
          >
            Recommendations
          </button>

          {/* If recomm button is clicked, open modal */}
          {isRecommOpen && <Recommendation setRecommOpen={setRecommOpen} />}
        </div>

        <div id="report-date-range-container">
          <DateRangeForm />
        </div>
      </div>

      <div className="cards-section-periodic">
        <TotalWeightCard />
        <MostWastedCard />
        <TotalKgWasteCard />
        <AccumulatedPriceCard />
        <PriceEachMonthCard />
        <ExpiredCard />
      </div>
    </div>
  );
}

function TotalWeightCard() {
  return (
    <div class="card" id="card-periodic-total-waste">
      <h3 class="h3-periodic">Total Weight of Food Waste in Kgs</h3>
      <h1 class="h1-periodic">INSERT KG</h1>
    </div>
  );
}

function MostWastedCard() {
  return (
    <div class="card" id="card-periodic-most-wasted">
      <h3 class="h3-periodic">Most Wasted Food Item</h3>
      PIE
    </div>
  );
}

function AccumulatedPriceCard() {
  return (
    <div class="card" id="card-periodic-accumulated">
      <h3 class="h3-periodic">Accumulated Price of Wastes</h3>
      <h1 class="h1-periodic">
        PHP <br />
        INSERT PRICE
      </h1>
    </div>
  );
}

function TotalKgWasteCard() {
  return (
    <div class="card" id="card-periodic-kg-each-month">
      <h3 class="h3-periodic">Total Kilograms of Waste for Each Month</h3>
      BAR
    </div>
  );
}

function PriceEachMonthCard() {
  return (
    <div class="card" id="card-periodic-price-each-month">
      <h3 class="h3-periodic">Total Price of Food Wastes for each Month</h3>
      LINE
    </div>
  );
}

function ExpiredCard() {
  return (
    <div class="card" id="card-periodic-expired">
      <h3 class="h3-periodic">Price of All Expired Items</h3>
      <h1 class="h1-periodic">
        PHP <br />
        INSERT PRICE
      </h1>
    </div>
  );
}
