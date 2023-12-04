import { useState } from "react";
import Header from "./Header";
import "./css/priceconversion.css";

//sample data
const sampleIngredients = [
  {
    Name: "Abcd",
    Price: "120", //per kilo
  },
  {
    Name: "Bcde"
  },
  {
    Name: "cdfghi"
  },
];

export default function PriceConversion() {
  return (
    <div className="priceconversion">
      <Header headerName={"Price Conversion"} />
      <IngredientSearch />
    </div>
  );
}

function IngredientSearch() {
  const [price, setPrice] = useState(0);

  const [searchedWord, setSearchedWord] = useState("");
  const [isItemsOpen, setItemsOpen] = useState(true);

  console.log(searchedWord);
  const handleSearch = (e) => {
    setSearchedWord(() => e.target.value);
  };

  const handleItemOpen = () => {
    setItemsOpen((prev) => !prev);
  };

  const handlePriceCalc = () => {
    // dito ata pwede ilagay how to compute for the price of the searched ingredient
    setPrice(1000); //sample value
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="converter-main-wrapper">
          <div id="price-ingredient-wrapper">
            <label for="price-ingredient">Ingredient</label>

            <div id="price-search-wrapper">
              <span className="search-icon">&#x2315;</span>
              <input
                type="text"
                id="price-ingredient"
                value={searchedWord}
                placeholder="Enter ingredient"
                onChange={handleSearch}
              />
              <i
                className={`fa fa-angle-down ${isItemsOpen ? "up" : ""}`}
                onClick={handleItemOpen}
              ></i>
            </div>

            {/* result after searching for ingredinet*/}
            {searchedWord !== "" && isItemsOpen && (
              <div id="ing-options-container">
                {sampleIngredients
                  .filter((ingredient) =>
                    ingredient.Name.toLowerCase().includes(
                      searchedWord.toLocaleLowerCase()
                    )
                  )
                  .map((ingredient) => (
                    <input
                      className="ing-option"
                      value={ingredient.Name}
                      onClick={(e) => handleSearch(e)}
                      readOnly
                    />
                  ))}
              </div>
            )}
          </div>

          <div id="price-weight-wrapper">
            <label for="price-weight">Weight (Kg)</label>

            <div id="price-search-wrapper">
              <input
                type="number"
                id="price-weight"
                placeholder="Enter weight in kg"
              />
            </div>
          </div>
        </div>

        <div className="converter-main-wrapper">
          <button className="compute-btn" onClick={handlePriceCalc}>Compute</button>
        </div>
      </div>

      <label id="price-price-label" for="price-price">Price</label>
      <div id="price-price-value"> &#8369; {price}</div>
    </>
  );
}
