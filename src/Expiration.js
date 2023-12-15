import "./css/expiration.css";
import { useState } from "react";
import { SearchBar, SortBy } from "./Search";
import Table from "./Table";
import { SecondHeader  } from "./Header";

//sample columns
const columns = [
  "ID",
  "Ingredient",
  "Type",
  "Pcs",
  "Kgs",
  "Price",

  "Expiration Date",
];

//sample data
const inventoryItems = [
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
      <SecondHeader title="List of Expired Items" color={'#EA6161'}/>
      <div className="body">
        <TableSection />
      </div>
    </div>
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
        <Table
          columns={columns}
          data={inventoryItems}
          handleClickedRecord={null}
        />
      </div>
    </>
  );
}
