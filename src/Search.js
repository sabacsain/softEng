import React, { useState, useEffect } from 'react';

const SearchBar = ({ inventory_items=[], setFilteredItems }) => {
    const [searchValue, setSearchValue] = useState("");
  
    useEffect(() => {
      // Filter the inventory items based on the search value
      const filteredItems = inventory_items.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setFilteredItems(filteredItems);
    }, [searchValue, inventory_items, setFilteredItems]);
  return (
    <div className="searchbox-wrapper">
      <span className="search-icon">&#x2315;</span>
      <input
        type="text"
        className="searchbox"
        placeholder="Search item here"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} 
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
export {SearchBar,SortBy, Filter};
