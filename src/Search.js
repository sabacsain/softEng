import { useState } from "react";

function SearchBar(props) {
  let data = props.listOfData;

  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="searchbox-wrapper">
      <span className="search-icon">&#x2315;</span>
          <input className="searchbox" type="text" placeholder="Search item here" onChange={(event) => {
            setSearchValue(event.target.value);
          }} />
        </div>
        
          {
            data 
              .filter((val) => {
                if(searchValue == ""){
                  return val;
                }else if(val.ingredient.toLowerCase().includes(searchValue.toLowerCase())){
                  return val;
                }
              })
              .map((val) => {
                return(
                  <div className="template" key={val.id}>
                      <h3>{val.ingredient}</h3>
                  </div> 
                )
              })
          }

    </>
  )
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
