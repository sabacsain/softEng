import { useState } from "react";
import "./css/inventory.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Table from "./Table.js";

//sample columns
const columns = [
  "Ingredient",
  "Type",
  "Pcs",
  "Kgs",
    "Price",

  "Expiration Date",
];

//sample data
const inventory_items = [
  {
    id: 23,
    Ingredient: "Carrot",
    Type: "Vegetable",
    Kgs: 0,
    Price: 250,
    Pcs: 100,
    Expiration: "12-02-2023",
  },
  {
    id: 12,
    Ingredient: "Ground Beef",
    Type: "Meat",
    Kgs: 25,
    Price: 500,
    Pcs: 100,
    Expiration: "12-02-2023",
  },
];

export default function Inventory() {
  return (
    <div className="inventory">
      <InventoryHeader />
      <div className="body">
        <div id="inventory-table">
          <TableSection />
        </div>
        <FormSection />
      </div>
    </div>
  );
}

function InventoryHeader() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleOpenNotif = () => {
    setIsNotifOpen((prev) => !prev);
  };

  console.log(isNotifOpen);
  return (
    <>
      <div class="inventory-header">
        <h1>Inventory</h1>
        <div class="inventory-notif-wrapper">
          <div class="notif">
            {/* {render span only when there are new notif that user has not seen yet} */}
            <span></span>

            <i class="fa fa-bell fa-2xs" onClick={handleOpenNotif}></i>
          </div>
        </div>
      </div>
      <hr></hr>

      {isNotifOpen === true && (
        <NotificationComponent handleOpenNotif={handleOpenNotif} />
      )}
    </>
  );
}

function NotificationComponent({ handleOpenNotif }) {
  return createPortal(
    <>
      {/* <!-- Overlay background --> */}
      <div id="overlay" class="overlay"></div>

      {/* <!-- Modal --> */}
      <div id="expiration-notification" class="modal">
        <div class="exp-notif-heading">
          <h2 class="h2-inventory">Expiring Items</h2>
          <Link to="/dashboard">See all expired items</Link>
        </div>

        <h3 class="h3-inventory tomorrow">Tomorrow (10)</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
          <div>Strawberryf jkdljfksf</div>
          <div>Strawberry fsdfsdf</div>
          <div>Strawberr f dfsfy</div>
          <div>Strawberry fdfsf</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberrdfsdfdsfy</div>
          <div>Strawbersfsdry</div>

          {/* <!-- DATABASE LIST --> */}
        </div>

        <h3 class="h3-inventory thisweek">This Week</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
          <div>Strawberryf jkdljfksf</div>
          <div>Strawberry fsdfsdf</div>
          <div>Strawberr f dfsfy</div>
          <div>Strawberry fdfsf</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberrdfsdfdsfy</div>
          <div>Strawbersfsdry</div>

          {/* <!-- DATABASE LIST --> */}
        </div>

        <button class="notif-close-btn" onClick={handleOpenNotif}>
          ✖
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}

function TableSection() {
  //for query
  const [searchValue, setSearchValue] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("Ingredient");
  const [order, setOrder] = useState("ASC");
  const [isPerishable, setIsPerishable] = useState(true);

  const [clickedRecord, setInventoryRecord] = useState({
    id: 0,
    ingredient: "",
    type: "",
    weight: 0,
    pieces: 0,
    price: 0,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue((currentWord) => (currentWord = e.target.value));
  };

  const handleSortColumn = (e) => {
    setSearchedColumn((selectedOption) => (selectedOption = e.target.value));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setOrder((previousOrder) => (previousOrder === "ASC" ? "DESC" : "ASC"));
  };

  const handleIsPerishable = (e) => {
    setIsPerishable((prevIsPerishable) => !prevIsPerishable);
  };

  //this is after clicking the record, the data from each cell should be obtained  //LAGAY SA MGA textfields 👻 DITO MO KUKUNIN YUNG ILALAGAY SA TEXT FIELDS ALALAHANIN MO
  const handleClickedRecord = (item) => {
    setInventoryRecord({
      id: item.id,
      ingredient: item.Ingredient,
      type: item.Type,
      weight: item.Kgs,
      pieces: item.Pcs,
      price: item.Price,
      expiration: item.Expiration
    })
  }

  //check mo kung nakuha mo nasa searchbox, at dropdowns !!!!!!
  console.log(searchValue);
  console.log(searchedColumn);
  console.log(order);
  console.log(isPerishable);
  console.log(clickedRecord);

  return (
    <div>
      <div id="inventory-search-and-sorting">
        <SearchBar handleSearch={handleSearch} />
        <SortBy
          options={columns}
          handleSortColumn={handleSortColumn}
          handleOrder={handleOrder}
          currentOrder={order}
        />
        <Filter handleIsPerishable={handleIsPerishable} />
      </div>

      {/* change column and data props */}
      <div className="inventory-table-wrapper">
        <Table columns={columns} data={inventory_items} handleClickedRecord={handleClickedRecord}/>
      </div>
    </div>
  );
}

function SearchBar({ handleSearch }) {
  return (
    <div className="searchbox-wrapper">
      <span className="search-icon">&#x2315;</span>
      <input
        type="text"
        className="searchbox"
        placeholder="Search item here"
        onChange={handleSearch}
      ></input>
    </div>
  );
}

function SortBy({ options, handleSortColumn, handleOrder, currentOrder }) {
  return (
    <div className="sort-by-wrapper">
      <label for="sort-by">Sort by:</label>
      <select id="sort-by" onChange={handleSortColumn}>
        {options.map((option) => (
          <option className="sort-option" value={option} key={option}>
            {option}
          </option>
        ))}
      </select>

      <button id="button-asc-desc" onClick={handleOrder}>
        <i
          className={`fa fa-long-arrow-up ${
            currentOrder === "ASC" ? "" : "rotate"
          }`}
        ></i>
      </button>
    </div>
  );
}

function Filter({ handleIsPerishable }) {
  return (
    <div className="sort-by-wrapper">
      <label for="filter-perishable">Filter:</label>
      <select id="filter-perishable" onChange={handleIsPerishable}>
        <option className="sort-option" value="Perishable">
          Perishable
        </option>
        <option className="sort-option" value="Non-perishable">
          Non-Perishable
        </option>
      </select>
    </div>
  );
}

function FormSection() {
  return <div></div>;
}
