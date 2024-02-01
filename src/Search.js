import React, { useState, useEffect } from "react";

const SearchBar = ({
  inventory_items = [],
  setFilteredItems,
  searchedColumn,
  order
}) => {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // Filter the inventory items based on the search value and searchedColumn
    const filteredItems = inventory_items.filter((item) => {
      const columnValue = item[searchedColumn.toLowerCase()];

      return (
        columnValue !== undefined &&
        columnValue.toString().toLowerCase().includes(searchValue.toLowerCase())
      );

    });

    //sort filteredItems either ASC or DESC
    const sorted_filteredItems = order === "ASC"? filteredItems.sort() : filteredItems.reverse()

    setFilteredItems(sorted_filteredItems);
  }, [searchValue, inventory_items, setFilteredItems, searchedColumn, order]);

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
};
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
export { SearchBar, SortBy, Filter };
