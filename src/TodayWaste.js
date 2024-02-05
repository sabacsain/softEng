import { useEffect, useState } from "react";
import Header from "./Header";
import Table from "./Table.js";
import axios from 'axios';
import "./css/todaywaste.css";
import { Link } from "react-router-dom";
import CrudButtons from "./CrudButtons.js";

//columns
const columns = [
  "Waste ID",
  "Inventory ID",
  "Ingredient",
  "Type",
  "Type ID",
  "Pcs",
  "Kgs",
  "Price",
];

//////////////////////

export default function TodayWaste() {
  return (
    <div className="todaywaste">
      <Header headerName={"Today's Waste"} />
      <div className="body">
        <TableSection />
      </div>
    </div>
  );
}

function TableSection() {

  //for waste
  const[waste_items, setWasteItems] = useState(
    [
      {
        id: 1,
        inventory_id: 12,
        Ingredient: "Carrot",
        Type: "Vegetable",
        TypeId: 2,
        Pcs: 100,
        Kgs: 0,
        price: 0,
      }
    ]
  ); 

  //Display all waste
  useEffect(()=>{
    const fetchAllWaste = async () => {
      try{
        const res = await axios.get("http://localhost:8081/wastes")
        
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { id: item.Waste_ID })['Waste_ID'];
          delete Object.assign(item, { inventory_id: item.Inventory_ID })['Inventory_ID'];
          delete Object.assign(item, { Ingredient: item.Name_inventory })['Name_inventory'];
          delete Object.assign(item, { Type: item.Type_name })['Type_name'];
          delete Object.assign(item, { TypeId: item.Type_ID })['Type_ID'];
          delete Object.assign(item, { Pcs: item.Pcs_waste })['Pcs_waste'];
          delete Object.assign(item, { Kgs: item.Kg_waste })['Kg_waste'];
          delete Object.assign(item, { price: item.Price })['Price'];
        }
        
        setWasteItems(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchAllWaste();
  }, [waste_items]);


  const [clickedRecord, setTodayWasteRecord] = useState({
    //holds attributes and values of the record you clicked from the table
    id: 0,
    inv_id: 0,
    ingredient: "",
    type: "Vegetable",
    typeId: 0,
    weight: 0,
    pieces: 0,
    price: 0,
  });

  const [operation, setOperation] = useState(""); //operation = checks if operation chosen is either add, update, or delete

  const handleClickedRecord = (item, isthereAnActiveRow) => {
    //this if is used to check if there is an active row (clicked record). then store the values to the clickedRecord variable using setInvetoryRecord function
    if (isthereAnActiveRow) {
      setTodayWasteRecord({
        id: item.id,
        inv_id: item.inventory_id,
        ingredient: item.Ingredient,
        type: item.Type,
        typeId: item.TypeId,
        weight: item.Kgs,
        pieces: item.Pcs,
        price: item.price,
      });
    }

    //if no record is active, these are the default values for clickedRecord variable
    else {
      setTodayWasteRecord({
        id: 0,
        inv_id: 0,
        ingredient: "",
        type: "Vegetable",
        typeId: 1,
        weight: 0,
        pieces: 0,
        price: 0,
      });
    }
  };

  //use this to add, update, delete
  //currentFormRecord = values from textboxes
  const [currentFormRecord, setCurrentFormRecord] = useState({
    id: 0,
    inv_id: 0,
    ingredient: "",
    type: "Vegetable",
    typeId: 1,
    weight: 0,
    pieces: 0,
    price: 0,
  });

  console.log(currentFormRecord)
   //if crud button is clicked, this function will be executed.
  // we are setting the currentFormRecord (the record to be updated/added sa database) based on values passed from the form
  const handleSetInventoryRecord = (textfieldsValues, operation, ID) => {
    setCurrentFormRecord(() => ({
      id: ID,
      inv_id: textfieldsValues.inventory_id,
      ingredient: textfieldsValues.ingredient_field,
      type: textfieldsValues.type_field,
      typeId: textfieldsValues.type_id,
      weight:
        textfieldsValues.quantity_dropdown === "Kg" //if value of dropdown kg,  PCS'value = 0
          ? textfieldsValues.quantity_field
          : 0,
      pieces:
        textfieldsValues.quantity_dropdown === "Pcs" //if value of dropdown is pcs, Kg value = 0
          ? textfieldsValues.quantity_field
          : 0,
      price: textfieldsValues.price_field,
    }));

    setOperation(() => operation); // updates the operation variable; either "add", "update", "delete"
  };

  // once the currentFormRecord has been updated(record has been passed from textfields and crud button has been clicked), choose which operation to execute
  useEffect(() => {
    switch (operation) {
      case "add":
        addRecord(currentFormRecord);
        break;
      case "update":
        updateRecord(currentFormRecord);
        break;
      case "delete":
        deleteRecord(currentFormRecord);
        break;
      default:
        break;
    }
  }, [currentFormRecord, operation]);

  //function for adding the currentFormRecord to the database
  //no need ng id
  const addRecord = (record) => {
    //insert code to add record to database
    axios.post('http://localhost:8081/addWaste', record)
    .then((res) => {
      if(res.data === "Failed") {
        alert("This ingredient is already in the waste list.")
      } else{
        alert("Successfully added new waste.")
      }
    })
    .catch((error) => {
      console.log('Error during adding record:', error);
      // Add additional error handling as needed
    });
  };

  //function for updating the currentFormRecord to the database
  const updateRecord = (record) => {
    axios.post('http://localhost:8081/updateWaste', record)
      .then((res) => {
        if(res.data === "Failed") {
          alert("This ingredient is already in the waste list.")
        } else{
          alert("Successfully Updated Record")
        }
      })
      .catch((error) => {
        alert('Error during updating record:', error);
        // Add additional error handling as needed
      });
  };

  const deleteRecord = (record) => {
    axios.post('http://localhost:8081/deleteWaste', record)
      .then((res) => {
        alert("Successfully Deleted Record.")
      })
      .catch((error) => {
        alert('Error during deleting record:', error);
        // Add additional error handling as needed
      });
  };

  return (
    <>
      <div id="waste-table">
        <Table
          columns={columns}
          data={waste_items}
          handleClickedRecord={handleClickedRecord}
        />
      </div>

      <FormSection
        clickedRecord={clickedRecord}
        handleSetInventoryRecord={handleSetInventoryRecord}
        addRecord={addRecord}
        updateRecord={updateRecord}
        deleteRecord={deleteRecord}
      />
    </>
  );
}

function FormSection({clickedRecord,handleSetInventoryRecord}) {
  //if not 0, use this for updating and deleting record; else, add new record
  const currentID = clickedRecord.id;

  //variable for tracking the textfields, if may changes sa fields dito i-uupdate
  const [textfields, setTextFieldsValues] = useState({
    inventory_id: 0,
    ingredient_field: "",
    type_field: "",
    type_id: 1,
    price_field: 0,
    quantity_field: "",
    quantity_dropdown: "",
  });

  //for types
  const[types, setTypes] = useState([]);

  //display list of type of wastes
  useEffect(()=>{
    const fetchAllTypes = async () => {
      try{
        const res = await axios.get("http://localhost:8081/types")
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { id: item.Type_ID })['Type_ID'];
          delete Object.assign(item, { type_name: item.Type_name })['Type_name'];
          delete Object.assign(item, { perishable: (item.Is_perishable == 0) ? "false": "true" })['Is_perishable'];
        }

        setTypes(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchAllTypes();
  });

  //if clickedRecord changes, this will execute
  //updates the values of textfields based on the clickedRecord
  useEffect(() => {
    //Runs only on the first render
    setTextFieldsValues(() => ({
      inventory_id: clickedRecord.inv_id,
      ingredient_field: clickedRecord.ingredient,
      type_field: clickedRecord.type,
      type_id: clickedRecord.typeId,
      price_field: clickedRecord.price,
      quantity_field:
        clickedRecord.weight > 0 ? clickedRecord.weight : clickedRecord.pieces,
      quantity_dropdown: clickedRecord.weight > 0 ? "Kg" : "Pcs",
    }));
  }, [clickedRecord]);

  //while textfields are being updates (while typing or changing dropdown values), this will execute
  const handleFieldChanges = (attribute1, value1, attribute2, value2) => {
    if (attribute2 !== null) {
      setTextFieldsValues((others) => ({
        ...others,
        [attribute1]: value1,
        [attribute2]: value2,
      }));
    } else {
      setTextFieldsValues((others) => ({
        ...others,
        [attribute1]: value1,
      }));
    }
  };

  //if crud button is clicked, pass the values from text fields, along with the operation (add, update, or delete)
  const handleOperation = (textfields, operation) => {
    const isEmpty = Object.values(textfields).some(value => {
      return typeof value === 'string' && value.trim() === '';
    });  
  
    if (operation === 'add') {
      if (!isEmpty) {
        handleSetInventoryRecord(textfields, operation, currentID);
      } else {
        alert("Please fill in the textfields.");
      }
    } else if (clickedRecord.id !== null && clickedRecord.id !== undefined && clickedRecord.id !== 0) {
      handleSetInventoryRecord(textfields, operation, currentID);
    } else {
      alert("No record was selected.");
    }
  };

  return (
    <form>
      <div className="today-waste-details-wrapper">
        <h2>Details</h2>

        <div id="today-waste-details">
          <div id="today-fields-wrapper">
            <div className="today-det-row">
              <div>
                <label for="waste-ingredient">Waste</label>
                <Dropdown
                  inventory_id={textfields.inventory_id}
                  inventory_name={textfields.ingredient_field}
                  handleFieldChanges={handleFieldChanges}
                />
              </div>
              <div>
                <div className="label-wrapper">
                  <label for="waste-type">Type</label>
                  <Link to="/inventory/types-of-wastes">
                    <span className="lbl-add-type">Add new type</span>
                  </Link>
                </div>
                {/* loops through each type of waste and being put as option */}
                <select
                  id="waste-type"
                  value={textfields.type_id}
                  onChange={(e) =>
                    handleFieldChanges("type_id", e.target.value)
                  }
                >
                  {types.map((type) => (
                    <option value={`${type.id}`}>{type.type_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="today-det-row">
              <div>
                <label for="waste-price">Price</label>
                <input
                  type="text"
                  id="waste-price"
                  placeholder="Enter price (&#8369;)"
                  value={textfields.price_field}
                  onChange={(e) =>
                    handleFieldChanges("price_field", e.target.value)
                  }
                />
              </div>
              <div>
                <label for="waste-qty">Quantity</label>
                <div>
                  <input
                    type="text"
                    id="waste-qty"
                    value={textfields.quantity_field}
                    onChange={(e) =>
                      handleFieldChanges("quantity_field", e.target.value)
                    }
                  />
                  <select
                    id="details-qty-dropd"
                    value={textfields.quantity_dropdown}
                    onChange={(e) =>
                      handleFieldChanges("quantity_dropdown", e.target.value)
                    }
                  >
                    <option value="Kg">Kg</option>
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CrudButtons
          handleOperation={(operation) =>
            handleOperation(textfields, operation)
          }
        />
      </div>
    </form>
  );
}

function Dropdown({ inventory_id, inventory_name, handleFieldChanges }) {
  const [searchedWord, setSearchedWord] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);

  //for ingredients
  const[inventory_items, setInventoryItems] = useState(
    [
      {
        inventory_id: 0,
        Ingredient: "Vegetable",
      }
    ]
  ); 

  //Display ingredients from inventory
  useEffect(()=>{
    const fetchAllIngredients = async () => {
      try{
        const res = await axios.get("http://localhost:8081/ingredientsDropdown")
        
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { inventory_id: item.Inventory_ID })['Inventory_ID'];
          delete Object.assign(item, { Ingredient: item.Name_inventory })['Name_inventory'];
        }
        setInventoryItems(res.data)
      } catch(err){
        console.log(err)
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
    handleFieldChanges(
      "inventory_id",
      ingredient.inventory_id,
      "ingredient_field",
      ingredient.Ingredient
    );
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
