import { useState, useEffect } from "react";
import "./css/dashboard.css";
import Header from "./Header";
import Recommendation from "./Recommendation";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from 'axios';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Header headerName={"Dashboard"} />
      <div className="body">
        <CurrentDayWaste />
        <HorizontalRule />
        <PeriodicWaste />
      </div>
    </main>
  );
}

function HorizontalRule() {
  return <div className="horizontal-rule">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>;
}

// CURRENT DAY WASTE SECTION
function CurrentDayWaste() {
  const date = new Date();
  const [isRecommOpen, setRecommOpen] = useState(false);
  const [dayWaste, setDayWaste] = useState({
    foodItem: "No waste",
    foodItemPrice: "No waste",
    totalPrice: "No waste",
    totalKilo: "No waste",
  })

  //get the current day waste statistics
  useEffect(()=>{
    const fetchDayWaste = async () => {
      try{
        const res = await axios.get("http://localhost:8081/dayWaste")
        
        //Compute today's statistics
        const priceSum = res.data.reduce((accumulator, object) => {
          return accumulator + object.Price;
        }, 0);

        const priceKilo = res.data.reduce((accumulator, object) => {
          return accumulator + object.Kg_waste;
        }, 0);

        const mostWasted = res.data.reduce(function(prev, current) {
          return (prev && prev.Price * prev.Kg_waste > current.Price * current.Kg_waste) ? prev : current
        })
      

        setDayWaste({
          foodItem: mostWasted.Name_inventory,
          foodItemPrice: mostWasted.Price * mostWasted.Kg_waste,
          totalPrice: priceSum,
          totalKilo: priceKilo
        })
      } catch(err){
        console.log(err)
      }
    };

    fetchDayWaste();
  }, []);
  
  function HandleClick() {
    setRecommOpen(true);
  }



  // INSERT CODE TO GET most wasted item by price, total price of all wastes, total kg of all wastes
  // pass those values as props to CurrentDayCard below
  return (
    <div className="report-section" id="dashboard-current-day-report">
      {/*For heading*/}
      <div>
        <span className="report-heading">Current Day Waste Report</span>
        <button
          class="button-recom"
          id="button-current-day"
          onClick={HandleClick}
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
            value={`${dayWaste.foodItem}`}
            subvalue={`PHP ${dayWaste.foodItemPrice}`}
          />
          <CurrentDayCard
            title={"Total Price of all Food Wastes"}
            value={`PHP ${dayWaste.totalPrice}`}
          />

          <CurrentDayCard
            title={"Total Kilograms of Food Wastes"}
            value={`${dayWaste.totalKilo}`}
          />
        </div>
      </div>
    </div>
  );
}

//Render cards in the current day section
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

function PeriodicWaste() {
  //tracks if recomm modal is open
  const [isRecommOpen, setRecommOpen] = useState(false);

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

  const [periodicWaste, setPeriodicWaste] = useState(
    {
      foodItem: "apple",
      foodItemPrice: 54,
      totalPrice: 25,
      totalKilo: 23
    }
  )

  //opens recomm button
  function HandleClick() {
    setRecommOpen((e) => (e = true));
  }

  // INSERT CODE HERE TO Get data based on selected range and date range(if custom)
  // extract total_weight, array/object(most wasted items by price; ex. name: Meat, price: 120), array/object(total kg per month or day), accumulated_price, array/object(total price per month or day), expired_total_price
  // then pass values as props to each card

  //get the periodic waste statistics
  useEffect(()=>{
    const fetchPeriodicWaste = (dateRange) => {
      axios.post('http://localhost:8081/periodicWaste', dateRange)
      .then((res) => {
        const priceSum = res.data.reduce((accumulator, object) => {
          return accumulator + object.Price;
        }, 0);

        const priceKilo = res.data.reduce((accumulator, object) => {
          return accumulator + object.Kg_inventory;
        }, 0);

        const mostWasted = res.data.reduce(function(prev, current) {
          return (prev && prev.Price * prev.Kg_inventory > current.Price * current.Kg_inventory) ? prev : current
        })

        console.log("Sum",priceSum)
        console.log("Kilo",priceKilo)
        console.log("Most",mostWasted)
      
        setPeriodicWaste({
          foodItem: mostWasted.Name_inventory,
          foodItemPrice: mostWasted.Price * mostWasted.Kg_inventory,
          totalPrice: priceSum,
          totalKilo: priceKilo
        })

      })
      .catch((error) => {
        console.log('Error during adding record:', error);
        // Add additional error handling as needed
      });
    }

    fetchPeriodicWaste(dateRange);
  },[dateRange]);

  console.log("Date Range:",dateRange)

  return (
    <div className="report-section" id="dashboard-periodic-report">
      <div className="report-sec-heading">
        {/* For heading */}
        <div className="report-heading-container">
          <span className="report-heading">Periodic Waste Report</span>
          <button
            class="button-recom"
            id="button-periodic"
            onClick={HandleClick}
          >
            Recommendations
          </button>
          {/* If recomm button is clicked, open modal */}
          {isRecommOpen && <Recommendation setRecommOpen={setRecommOpen} />}
          {/*may pass data as prop to recomm.js*/}
        </div>

        <div id="report-date-range-container">
          <DateRangeForm
            setDateRange={setDateRange}
            setSelectedRange={setSelectedRange}
            selectedRange={selectedRange}
            dateRange={dateRange}
          />
        </div>
      </div>

      <div className="cards-section-periodic">
        <TotalWeightCard weight={periodicWaste.totalKilo} />
        <MostWastedCard />
        <TotalKgWasteCard />
        <AccumulatedPriceCard accumulated_price={periodicWaste.totalPrice} />
        <PriceEachMonthCard />
        <ExpiredCard expired_total_price={3425} />
      </div>
    </div>
  );
}

//Rendering Date range dropdown and Calendar
function DateRangeForm({
  setDateRange, // function to change date range (ex. nov-dec)
  setSelectedRange, // function to change range (ex. last year)
  selectedRange, // actual value; selected range (last year)
  dateRange, // actual value; selected date range (nov-dec)
}) {
  //tracks if calendar is open
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  //sets the date ranges for last year, last month, last week
  function HandleSelectedRangeChange(selectedRange) {
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
              new Date().setFullYear(new Date().getFullYear()-1) //if chosen range is custom
            ),
            endDate: new Date(),
            key: "selection",
          },
        ]);
        setIsCalendarOpen(false);
    }
  }

  //sets the date range specified by user using the calendar
  function HandleDateRangeChange(range) {
    setDateRange([range.selection]);
  }

  return (
    <>
      {/* {render dropdown to select range } */}
      <div className="main-range-container">
        <label for="date-range">Date range:</label>
        <select
          id="date-range"
          onChange={(e) => HandleSelectedRangeChange(e.target.value)}
        >
          <option value="last-year">Last Year</option>
          <option value="last-month">Last Month</option>
          <option value="last-week">Last Week</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* {render the actual date range (ex. Nov 2 1990 - Nov 10 2023) } */}
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

        {/* {is user selected custom, open the date range picker (calendar) } */}
        {selectedRange === "custom" && !isCalendarOpen && (
          <div className="calendar-container">
            <DateRange
              editableDateInputs={true}
              onChange={HandleDateRangeChange}
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

//PERIODIC WASTE CARDS ---------------
function TotalWeightCard({ weight }) {
  return (
    <div class="card" id="card-periodic-total-waste">
      <h3 class="h3-periodic">Total Weight of Food Waste in Kgs</h3>
      <h1 class="h1-periodic">{weight} Kgs</h1>
    </div>
  );
}

function MostWastedCard({ dataaa }) {
  //sample data you can pass
  const data = [
    {
      name: "Canned",
      value: 400,
    },
    {
      name: "Vegetable",
      value: 300,
    },
    {
      name: "Meat",
      value: 300,
    },
    {
      name: "Fish",
      value: 200,
    },
    {
      name: "Others",
      value: 278,
    },
  ];

  //set colors of pie chart
  const COLORS = ["#D0EFB1", "#B3D89C", "#9DC3C2", "#77A6B6", "#4D7298"];

  //for labels of piechart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#4D7298"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name}`}
      </text>
    );
  };

  return (
    <div class="card" id="card-periodic-most-wasted">
      <h3 class="h3-periodic">Most Wasted Food Item (By Price)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            nameKey
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function AccumulatedPriceCard({ accumulated_price }) {
  return (
    <div class="card" id="card-periodic-accumulated">
      <h3 class="h3-periodic">Accumulated Price of Wastes</h3>
      <h1 class="h1-periodic">
        PHP <br />
        {accumulated_price}
      </h1>
    </div>
  );
}

function TotalKgWasteCard({ dataaa }) {
  //sample data you can pass
  const data = [
    {
      name: "Jan",
      Kg: 2400,
    },
    {
      name: "Feb",
      Kg: 1398,
    },
    {
      name: "Mar",
      Kg: 9800,
    },
    {
      name: "Apr",
      Kg: 3908,
    },
    {
      name: "May",
      Kg: 4800,
    },
    {
      name: "Jun",
      Kg: 3800,
    },
    {
      name: "Jul",
      Kg: 4300,
    },
    {
      name: "Aug",
      Kg: 9800,
    },
    {
      name: "Sep",
      Kg: 3908,
    },
    {
      name: "Oct",
      Kg: 4800,
    },
    {
      name: "Nov",
      Kg: 3800,
    },
    {
      name: "Dec",
      Kg: 4300,
    },
  ];

  return (
    <div class="card" id="card-periodic-kg-each-month">
      <h3 class="h3-periodic">Total Kilograms of Waste for Each Month</h3>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Kg" fill="#77A6B6" />
      </BarChart>
    </div>
  );
}

function PriceEachMonthCard({ dataaa }) {
  //sample data you can pass
  const data = [
    {
      name: "Jan",
      price: 2400,
    },
    {
      name: "Feb",
      price: 1398,
    },
    {
      name: "Mar",
      price: 19800,
    },
    {
      name: "Apr",
      price: 3908,
    },
    {
      name: "May",
      price: 4800,
    },
    {
      name: "Jun",
      price: 3800,
    },
    {
      name: "Jul",
      price: 4300,
    },
    {
      name: "Aug",
      price: 9800,
    },
    {
      name: "Sep",
      price: 3908,
    },
    {
      name: "Oct",
      price: 4800,
    },
    {
      name: "Nov",
      price: 3800,
    },
    {
      name: "Dec",
      price: 4300,
    },
  ];

  return (
    <div class="card" id="card-periodic-price-each-month">
      <h3 class="h3-periodic">Total Price of Food Wastes for each Month</h3>
      <LineChart
        width={700}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#77A6B6"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

function ExpiredCard({ expired_total_price }) {
  return (
    <div class="card" id="card-periodic-expired">
      <h3 class="h3-periodic">Price of All Expired Items</h3>
      <h1 class="h1-periodic">
        PHP <br />
        {expired_total_price}
      </h1>
    </div>
  );
}
