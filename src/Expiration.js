import { useEffect, useState, useMemo } from "react";
import "./css/expiration.css";
import axios from "axios";
import { SearchBar, SortBy, Filter } from "./Search";
import Table from "./Table";
import { SecondHeader } from "./Header";
import moment from "moment";

//sample columns
const columns = [
  "ID",
  "Ingredient",
  "Type",
  "Pieces",
  "Weight",
  "Price",
  "Expiration",
];

export default function Expiration() {
  return (
    <div className="expiration">
      <SecondHeader title="List of Expired Items" color={"#EA6161"} />
      <div className="body">
        <TableSection />
      </div>
    </div>
  );
}

function TableSection() {
  //table section with form section
  //for query
  //for waste
  const [inventory_items, setInventoryItems] = useState([
    {
      id: 0,
      ingredient: "",
      type: "Vegetable",
      pieces: 0,
      weight: 0,
      price: 0,
      expiration: "",
    },
  ]);
  const [filteredItems, setFilteredItems] = useState([]);

  //display ingredients from inventory
  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/inventory/expiration-table"
        );
       //Rename the keys of the data object
       res.data.forEach(Rename);
       function Rename(item) {
         delete Object.assign(item, { id: item.Exp_ID })["Exp_ID"];
         delete Object.assign(item, { ingredient: item.Name_inventory })[
           "Name_inventory"
         ];
         delete Object.assign(item, { type: item.Type_name })["Type_name"];
         delete Object.assign(item, { weight: item.Kg_inventory })[
           "Kg_inventory"
         ];
         delete Object.assign(item, { pieces: item.Pcs_inventory })[
           "Pcs_inventory"
         ];
         delete Object.assign(item, { price: item.Price })["Price"];
         delete Object.assign(item, {
          expiration: moment
            .utc(item.Expiration_date)
            .utc()
            .format("YYYY/MM/DD"),
        })["Expiration_date"];
      }
       setInventoryItems(res.data);
     } catch (err) {
       console.log(err);
     }
   };

   fetchAllIngredients();
 }, []);
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
        <SearchBar
          handleSearch={handleSearch}
          inventory_items={inventory_items}
          setFilteredItems={setFilteredItems}
          searchedColumn={searchedColumn}
          order={order}
        />
        <SortBy
          options={columns}
          data={filteredItems}
          handleSortColumn={handleSortColumn}
          handleOrder={handleOrder}
          currentOrder={order}
        />
      </div>

      <div className="expiration-table-wrapper">
        {/* null - even if record is clicked, no data will be received from the table unlike in inventory and today's waste */}
        <Table
          columns={Object.keys(inventory_items[0])}
          data={filteredItems.map((item) => ({
              ...item,
            })) || []
          }
          handleClickedRecord={null}
        />
      </div>
    </>
  );
}