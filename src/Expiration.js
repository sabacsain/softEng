import { Link } from "react-router-dom";
import "./css/expiration.css";
import { useState } from "react";
import {SearchBar, SortBy } from "./Search";
import Table from "./Table";

//sample columns
const columns = [
    "Ingredient",
    "Type",
    "Pcs",
    "Kgs",
    "Price",
  
    "Expiration Date",
  ];
  
  //sample types
  const types = ["Vegetable", "Meat", "A", "B", "C"];
  
  //sample data
  const inventory_items = [
    {
      id: 23,
      Ingredient: "Carrot",
      Type: "Vegetable",
      Pcs: 100,
  
      Kgs: 0,
      Price: 250,
      Expiration: "2023-12-02",
    },
    {
      id: 12,
      Ingredient: "Ground Beef",
      Type: "Meat",
      Pcs: 0,
      Kgs: 25,
      Price: 500,
      Expiration: "2023-01-02",
    },
  ];

export default function Expiration() {
  return (
    <div className="expiration">
      <TodayWasteHeader />
      <div className="body">
        <TableSection />
      </div>
    </div>
  );
}

function TodayWasteHeader() {
  return (
    <>
      <div className="date-header">
        <span>{new Date().toDateString()}</span>
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.27734 1.55857V0.506029C9.27734 0.2294 9.04794 0 8.77131 0C8.49469 0 8.26529 0.2294 8.26529 0.506029V1.51809H3.87972V0.506029C3.87972 0.2294 3.65032 0 3.37369 0C3.09706 0 2.86766 0.2294 2.86766 0.506029V1.55857C1.04596 1.72725 0.162095 2.81352 0.0271544 4.42607C0.0136602 4.62173 0.17559 4.78366 0.364507 4.78366H11.7805C11.9762 4.78366 12.1381 4.61498 12.1179 4.42607C11.9829 2.81352 11.099 1.72725 9.27734 1.55857Z"
            fill="#77A6B6"
          />
          <path
            d="M11.47 5.79541H0.674705C0.303617 5.79541 0 6.099 0 6.47009V10.6263C0 12.6504 1.01206 13.9998 3.37353 13.9998H8.77117C11.1326 13.9998 12.1447 12.6504 12.1447 10.6263V6.47009C12.1447 6.099 11.8411 5.79541 11.47 5.79541ZM4.18992 11.4427C4.15618 11.4697 4.12245 11.5034 4.08871 11.5236C4.04823 11.5506 4.00775 11.5709 3.96727 11.5844C3.92678 11.6046 3.8863 11.6181 3.84582 11.6248C3.79859 11.6316 3.75811 11.6383 3.71088 11.6383C3.62317 11.6383 3.53546 11.6181 3.45449 11.5844C3.36678 11.5506 3.29931 11.5034 3.23184 11.4427C3.11039 11.3145 3.03617 11.139 3.03617 10.9636C3.03617 10.7882 3.11039 10.6128 3.23184 10.4846C3.29931 10.4239 3.36678 10.3766 3.45449 10.3429C3.57594 10.2889 3.71088 10.2754 3.84582 10.3024C3.8863 10.3092 3.92678 10.3227 3.96727 10.3429C4.00775 10.3564 4.04823 10.3766 4.08871 10.4036C4.12245 10.4306 4.15618 10.4576 4.18992 10.4846C4.31137 10.6128 4.38558 10.7882 4.38558 10.9636C4.38558 11.139 4.31137 11.3145 4.18992 11.4427ZM4.18992 9.0812C4.06173 9.20264 3.8863 9.27686 3.71088 9.27686C3.53546 9.27686 3.36003 9.20264 3.23184 9.0812C3.11039 8.953 3.03617 8.77758 3.03617 8.60216C3.03617 8.42673 3.11039 8.25131 3.23184 8.12312C3.42076 7.9342 3.71763 7.87348 3.96727 7.98143C4.05498 8.01516 4.1292 8.06239 4.18992 8.12312C4.31137 8.25131 4.38558 8.42673 4.38558 8.60216C4.38558 8.77758 4.31137 8.953 4.18992 9.0812ZM6.55139 11.4427C6.42319 11.5641 6.24777 11.6383 6.07235 11.6383C5.89692 11.6383 5.7215 11.5641 5.59331 11.4427C5.47186 11.3145 5.39764 11.139 5.39764 10.9636C5.39764 10.7882 5.47186 10.6128 5.59331 10.4846C5.84295 10.2349 6.30175 10.2349 6.55139 10.4846C6.67284 10.6128 6.74705 10.7882 6.74705 10.9636C6.74705 11.139 6.67284 11.3145 6.55139 11.4427ZM6.55139 9.0812C6.51765 9.10819 6.48392 9.13517 6.45018 9.16216C6.4097 9.18915 6.36922 9.20939 6.32874 9.22289C6.28825 9.24313 6.24777 9.25662 6.20729 9.26337C6.16006 9.27012 6.11958 9.27686 6.07235 9.27686C5.89692 9.27686 5.7215 9.20264 5.59331 9.0812C5.47186 8.953 5.39764 8.77758 5.39764 8.60216C5.39764 8.42673 5.47186 8.25131 5.59331 8.12312C5.65403 8.06239 5.72825 8.01516 5.81596 7.98143C6.0656 7.87348 6.36247 7.9342 6.55139 8.12312C6.67284 8.25131 6.74705 8.42673 6.74705 8.60216C6.74705 8.77758 6.67284 8.953 6.55139 9.0812ZM8.91286 11.4427C8.78466 11.5641 8.60924 11.6383 8.43382 11.6383C8.25839 11.6383 8.08297 11.5641 7.95477 11.4427C7.83333 11.3145 7.75911 11.139 7.75911 10.9636C7.75911 10.7882 7.83333 10.6128 7.95477 10.4846C8.20442 10.2349 8.66321 10.2349 8.91286 10.4846C9.0343 10.6128 9.10852 10.7882 9.10852 10.9636C9.10852 11.139 9.0343 11.3145 8.91286 11.4427ZM8.91286 9.0812C8.87912 9.10819 8.84539 9.13517 8.81165 9.16216C8.77117 9.18915 8.73069 9.20939 8.6902 9.22289C8.64972 9.24313 8.60924 9.25662 8.56876 9.26337C8.52153 9.27012 8.4743 9.27686 8.43382 9.27686C8.25839 9.27686 8.08297 9.20264 7.95477 9.0812C7.83333 8.953 7.75911 8.77758 7.75911 8.60216C7.75911 8.42673 7.83333 8.25131 7.95477 8.12312C8.02225 8.06239 8.08972 8.01516 8.17743 7.98143C8.29887 7.92745 8.43382 7.91396 8.56876 7.94095C8.60924 7.94769 8.64972 7.96119 8.6902 7.98143C8.73069 7.99492 8.77117 8.01516 8.81165 8.04215L8.91286 8.12312C9.0343 8.25131 9.10852 8.42673 9.10852 8.60216C9.10852 8.77758 9.0343 8.953 8.91286 9.0812Z"
            fill="#77A6B6"
          />
        </svg>
      </div>

      <div className="exp-back-btn-wrapper">
        <Link to="/inventory">
          <button className="back-btn">
            <i class="fa fa-long-arrow-left"></i>
          </button>
        </Link>
        <span>Go Back to Inventory</span>
      </div>

      <div className="expiration-header">
        <h1>List of Expired Items</h1>
        <hr />
      </div>
    </>
  );
}

function TableSection() {
  //table section with form section
  //for query
  const [searchValue, setSearchValue] = useState(""); //holds the value you type in the searchbox
  const [searchedColumn, setSearchedColumn] = useState("Ingredient"); //hold the chosen column beside the sortby
  const [order, setOrder] = useState("ASC"); //holds the chosen order, ASC or DESC

  const handleSearch = (e) => {
    //updates the searchValue variable when you type in the searcbox
    e.preventDefault(); //prevents page from loading after submit or enter
    setSearchValue((currentWord) => (currentWord = e.target.value));
  };

  const handleSortColumn = (e) => {
    //updates the searchedColumn variable when you choose from sortby dropdown
    setSearchedColumn((selectedOption) => (selectedOption = e.target.value));
  };

  const handleOrder = (e) => {
    //updates when u click the arrow
    e.preventDefault();
    setOrder((previousOrder) => (previousOrder === "ASC" ? "DESC" : "ASC"));
  };

  console.log(searchValue);
  console.log(searchedColumn);
  console.log(order);
  return (
    <>
      <div className="expiration-search-wrapper">
        <SearchBar handleSearch={handleSearch} />
        <SortBy
          options={columns}
          handleSortColumn={handleSortColumn}
          handleOrder={handleOrder}
          currentOrder={order}
        />
      </div>

      <div className="expiration-table-wrapper">
        {/* null - even if record is clicked, no data will be received from the table unlike in inventory and today's waste */}
        <Table columns={columns} data={inventory_items} handleClickedRecord={null}/> 
      </div>
    </>
  );
}
