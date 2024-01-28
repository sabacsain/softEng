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

  const [expiredTotal, setExpiredTotal] = useState(0);

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
      axios.post('http://localhost:8081/periodicWaste', dateRange[0])
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
        console.log('Error during fetching record:', error);
        // Add additional error handling as needed
      });
    }

    fetchPeriodicWaste(dateRange);
  },[dateRange]);
  
    //get the expired waste statistics
    useEffect(()=>{
      const fetchExpiredTotal = (dateRange) => {
        axios.get('http://localhost:8081/expiredStats')
        .then((res) => {

          const priceSum = res.data.reduce((accumulator, object) => {
            return accumulator + object.Price;
          }, 0);
        
          setExpiredTotal(priceSum)
  
        })
        .catch((error) => {
          console.log('Error during fetching record:', error);
          // Add additional error handling as needed
        });
      }
      fetchExpiredTotal();
    },[]);

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
        <ExpiredCard expired_total_price={expiredTotal} />
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
            startDate: new Date().setFullYear(new Date().getFullYear() - 1), //start date is 1 yr ago
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
  const [mostWasted, setMostWasted] = useState([]);

  //Display ingredients from inventory
  useEffect(()=>{
    const fetchMostWasted = async () => {
      try{
        const res = await axios.get("http://localhost:8081/mostWasted")
        
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { name: item.Name_inventory })['Name_inventory'];
          delete Object.assign(item, { value: item.Price })['Price'];
        }
        setMostWasted(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchMostWasted();
  }, []);

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
        {`${mostWasted[index].name}`}
      </text>
    );
  };

  return (
    <div class="card" id="card-periodic-most-wasted">
      <h3 class="h3-periodic">Most Wasted Food Item (By Price)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            data={mostWasted}
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
            {mostWasted.map((entry, index) => (
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
  const [KgWaste, setKgWaste] = useState([]);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }  

  useEffect(()=>{
    const fetchMonthlyReport= async () => {
      try{
        const res = await axios.get("http://localhost:8081/monthlyReport")
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { name: getMonthName(item['MONTH(Date_waste)'])})['MONTH(Date_waste)'];
          delete Object.assign(item, { Kg: item['SUM(Kg_waste)']})['SUM(Kg_waste)'];
          delete item['SUM(Price)'];
        }

        setKgWaste(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchMonthlyReport();
  },[]);


  return (
    <div class="card" id="card-periodic-kg-each-month">
      <h3 class="h3-periodic">Total Kilograms of Waste for Each Month</h3>
      <BarChart width={730} height={250} data={KgWaste}>
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
  const [priceMonthData, setPriceMonthData] = useState([]);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }  

  useEffect(()=>{
    const fetchMonthlyReport= async () => {
      try{
        const res = await axios.get("http://localhost:8081/monthlyReport")
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { name: getMonthName(item['MONTH(Date_waste)'])})['MONTH(Date_waste)'];
          delete Object.assign(item, { price: item['SUM(Kg_waste)'] * item['SUM(Price)']})['SUM(Kg_waste)'];
          delete item['SUM(Price)'];
        }

        setPriceMonthData(res.data)
        console.log(priceMonthData)
      } catch(err){
        console.log(err)
      }
    };

    fetchMonthlyReport();
  },[]);

  return (
    <div class="card" id="card-periodic-price-each-month">
      <h3 class="h3-periodic">Total Price of Food Wastes for each Month</h3>
      <LineChart
        width={700}
        height={250}
        data={priceMonthData}
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
