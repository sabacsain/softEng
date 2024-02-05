import { useEffect, useState } from "react";
import "./css/expiration.css";
import axios from 'axios';
import { SearchBar, SortBy, Filter } from "./Search";
import Table from "./Table";
import { SecondHeader  } from "./Header";

//sample columns
const columns = [
  "ID",
  "Ingredient",
  "Type Name",
  "Pcs",
  "Kgs",
  "Price",
  "Expiration Date"
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
    //for waste
    const[inventory_items, setInventoryItems] = useState(
      [
        {
          id: 0,
          ingredient: "",
          type: "",
          pieces: 0,
          weight: 0,
          price: 0,
          expiration:""
        
        }
      ]
    );
    const [filteredItems, setFilteredItems] = useState([]);

  //display ingredients from inventory
  useEffect(()=>{
    const fetchAllIngredients = async () => {
      try{
        const res = await axios.get("https://softeng-backend.onrender.com/inventory/expiration-table")
        setInventoryItems(res.data)
      } catch(err){
        console.log(err)
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
        <SearchBar handleSearch={handleSearch} inventory_items={inventory_items} setFilteredItems={setFilteredItems}/>
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
          data={filteredItems.map(item => ({
            ...item,
            Expiration_date: new Date(item.Expiration_date).toLocaleDateString("en-US")
          })) || []}
          handleClickedRecord={null}
        />
      </div>
    </>
  );
}
