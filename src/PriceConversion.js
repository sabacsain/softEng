import { useState } from "react";
import Header from "./Header";
import "./css/priceconversion.css";
import { useEffect } from "react";
import axios from "axios";

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
  const [isItemsOpen, setItemsOpen] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState({
    ingredient: "",
    inventory_id: 0,
    price: 0,
  });
  const [weight, setWeight] = useState(0);

  const handleFieldChanges = (field, value, field2, value2) => {
    setSelectedIngredient((prev) => ({
      ...prev,
      [field]: value,
      [field2]: value2,
    }));
  };
  
  const handleItemOpen = () => {
    setItemsOpen((prev) => !prev);
  };

  const handlePriceCalc = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/ingredientPrice/${selectedIngredient.inventory_id}`);
      const ingredientPrice = res.data.price;

      if (weight > 0 && ingredientPrice > 0) {
        setPrice(ingredientPrice * weight);
      } else {
        // Handle invalid weight or price
        setPrice(0);
      }
    } catch (error) {
      console.error("Error fetching ingredient price:", error);
    }
  }; 

  return (
    <>
      <div className="main-wrapper">
        <div className="converter-main-wrapper">
          <div id="price-ingredient-wrapper">
            <label for="price-ingredient">Ingredient</label>

            <Dropdown 
            inventory_id={selectedIngredient.inventory_id}
            inventory_name={selectedIngredient.ingredient}
            handleFieldChanges={handleFieldChanges}
            price={price}
            setPrice={setPrice}
            />
          </div>

          <div id="price-weight-wrapper">
            <label for="price-weight">Weight (Kg)</label>

            <div id="price-search-wrapper">
              <input
                type="number"
                id="price-weight"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="converter-main-wrapper">
          <button className="compute-btn" onClick={handlePriceCalc} >
            Compute 
          </button>
        </div>
      </div>

      <label id="price-price-label" for="price-price">
        Price
      </label>
      <div id="price-price-value"> &#8369; {price}</div>
    </>
  );
}

function Dropdown({ inventory_id, inventory_name, handleFieldChanges, price, setPrice }) {
  const [searchedWord, setSearchedWord] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);

  //for ingredients
  const [inventory_items, setInventoryItems] = useState([
    {
      inventory_id: 0,
      Ingredient: "Vegetable",
    },
  ]);

  //Display ingredients from inventory
  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8081/ingredientsDropdown"
        );

        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item) {
          delete Object.assign(item, { inventory_id: item.Inventory_ID })[
            "Inventory_ID"
          ];
          delete Object.assign(item, { Ingredient: item.Name_inventory })[
            "Name_inventory"
          ];
        }
        setInventoryItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllIngredients();
  }, []);

  useEffect(() => {
    setChosenItem({
      ingredient: inventory_name,
      inventory_id: inventory_id,
    });
  }, [inventory_id, inventory_name]);

  const handleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchedWord(() => e.target.value);
  };

  const [chosenItem, setChosenItem] = useState({
    ingredient: "",
    inventory_id: 0,
  });

  const handleDropDownss = (ingredient) => {
    handleFieldChanges("inventory_id", ingredient.inventory_id, "ingredient", ingredient.Ingredient);
    setPrice(0); // Reset the price when a new ingredient is selected
    setSearchOpen(false); // Close the dropdown after selecting an ingredient
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown" onClick={handleSearchOpen}>
        {chosenItem.ingredient !== ""
          ? chosenItem.ingredient
          : "Select ingredient"}
        <i
          className={`fa fa-angle-down ${isSearchOpen ? "up" : ""}`}
          onClick={handleSearchOpen}
        ></i>
      </div>

      {isSearchOpen && (
        <div className="dropdown-search-wrapper">
          <div className="dropdown-searchbox-wrapper">
            <span className="search-icon">&#x2315;</span>
            <input
              required
              type="text"
              id="waste-ingredient"
              placeholder="Inventory name or number"
              onChange={handleSearch}
              value={searchedWord}
            />
          </div>

          <div className="dropdown-result-wrapper">
            {isSearchOpen && (
              <div id="ing-options-container">
                {inventory_items
                  .filter(
                    (ingredient) =>
                      ingredient.Ingredient.toLowerCase().includes(
                        searchedWord.toLocaleLowerCase()
                      ) ||
                      String(ingredient.inventory_id).includes(searchedWord)
                  )
                  .map((ingredient, key) => (
                    <div
                      id={key}
                      className="dropdown-option"
                      onClick={() => handleDropDownss(ingredient)}
                    >
                      {ingredient.inventory_id} - {ingredient.Ingredient}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
