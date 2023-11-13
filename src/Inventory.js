import { useState } from "react";
import "./css/inventory.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

//sample columns
const columns = [
  "Ingredient",
  "Type",
  "Price",
  "Kgs",
  "Pcs",
  "Expiration Date",
];

export default function Inventory() {
  return (
    <div className="inventory">
      <InventoryHeader />
      <div className="body">
        <TableSection />
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

  console.log(isNotifOpen)
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

        {/* <!-- DATABASE LIST --> */}

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

  //check mo kung nakuha mo nasa searchbox, at dropdowns !!!!!!
  console.log(searchValue);
  console.log(searchedColumn);
  console.log(order);
  console.log(isPerishable);

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
      <Table />
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

function Table() {
  // baka gawing separate component
}

function FormSection() {
  return <div></div>;
}
