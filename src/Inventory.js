import { useEffect, useState } from "react";
import "./css/inventory.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { SearchBar, SortBy, Filter } from "./Search.js";
import Table from "./Table.js";
import { format } from "date-fns";
import CrudButtons from "./CrudButtons.js";
import axios from 'axios';
import moment from 'moment';

//sample columns
const columns = [
  "ID",
  "Ingredient",
  "Type",
  "Type ID",
  "Pcs",
  "Kgs",
  "Price",
  "Expiration Date",
];
//sample types
const types = ["Vegetable", "Meat", "A", "B", "C"];

export default function Inventory() {
  return (
    <div className="inventory">
      <InventoryHeader />
      <div className="body">
        <div id="inventory-table">
          <TableSection />
        </div>
      </div>
    </div>
  );
}

function InventoryHeader() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleOpenNotif = () => {
    setIsNotifOpen((prev) => !prev);
  };

  console.log(isNotifOpen);
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
  const [expiringThisDay, setExpiringThisDay] = useState([]);
  const [expiringThisWeek, setExpiringThisWeek] = useState([]);
  
  //get the ingredients expiring today
  useEffect(()=>{
    const fetchExpiringToday = async () => {
      try{
        const res = await axios.get("http://localhost:8081/expiringToday")
        setExpiringThisDay(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchExpiringToday();
  }, []);


  //get the ingredients expiring week
  useEffect(()=>{
    const fetchExpiringWeek = async () => {
      try{
        const res = await axios.get("http://localhost:8081/expiringWeek")
        setExpiringThisWeek(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchExpiringWeek();
  }, []);

  return createPortal(
    <>
      {/* <!-- Overlay background --> */}
      <div id="overlay" class="overlay"></div>

      {/* <!-- Modal --> */}
      <div id="expiration-notification" class="modal">
        <div class="exp-notif-heading">
          <h2 class="h2-inventory">Expiring Items</h2>
          <Link to="/inventory/expiration-table">See all expired items</Link>
        </div>

        <h3 class="h3-inventory tomorrow">Tomorrow ({expiringThisDay.length})</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
          {expiringThisDay.map((expiringThisDay) => (
            <div>{expiringThisDay.Name_inventory}</div>
          ))}
        </div>

        <h3 class="h3-inventory thisweek">This Week</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
        {expiringThisWeek.map((expiringThisWeek) => (
            <div>{expiringThisWeek.Name_inventory}</div>
          ))}
        </div>

        <button class="notif-close-btn" onClick={handleOpenNotif}>
          ✖
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}

function TableSection() {
  //table section with form section

  //for ingredients
  const[inventory_items, setInventoryItems] = useState(
    [
      {
      id: 0,
      typeId: 1,
      ingredient: "",
      type: "Vegetable",
      weight: 0,
      pieces: 0,
      price: 0,
      expiration:""
      }
    ]
  );

  const [filteredItems, setFilteredItems] = useState([]);
  //Display ingredients from inventory
  useEffect(()=>{
    const fetchAllIngredients = async () => {
      try{
        const res = await axios.get("http://localhost:8081/ingredients")
        
        //Rename the keys of the data object
        res.data.forEach(Rename);
        function Rename(item){
          delete Object.assign(item, { id: item.Inventory_ID })['Inventory_ID'];
          delete Object.assign(item, { ingredient: item.Name_inventory })['Name_inventory'];
          delete Object.assign(item, { type: item.Type_name })['Type_name'];
          delete Object.assign(item, { typeId: item.Type_ID })['Type_ID'];
          delete Object.assign(item, { weight: item.Kg_inventory })['Kg_inventory'];
          delete Object.assign(item, { pieces: item.Pcs_inventory })['Pcs_inventory'];
          delete Object.assign(item, { price: item.Price })['Price'];
          delete Object.assign(item, { expiration: moment.utc(item.Expiration_date).format('YYYY/MM/DD') })['Expiration_date'];
        }
        setInventoryItems(res.data)
      } catch(err){
        console.log(err)
      }
    };

    fetchAllIngredients();
  }, []);

  //for query
  const [searchValue, setSearchValue] = useState(""); //holds the value you type in the searchbox
  const [searchedColumn, setSearchedColumn] = useState("Ingredient"); //hold the chosen column beside the sortby
  const [order, setOrder] = useState("ASC"); //holds the chosen order, ASC or DESC
  const [isPerishable, setIsPerishable] = useState(true); //hpersihable or non

  const [clickedRecord, setInventoryRecord] = useState({
    //holds attributes and values of the record u clicked from the table
    id: 0,
    typeID: 1,
    ingredient: "",
    type: "Vegetable",
    weight: 0,
    pieces: 0,
    price: 0,
    expiration: ""
  });

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

  const handleIsPerishable = (e) => {
    //updates isPerishable when you chosefrom filter dropdown
    setIsPerishable((prevIsPerishable) => !prevIsPerishable);
  };

  const [operation, setOperation] = useState(""); //operation = checks if operation chosen is either add, update, or delete

  //handleClickedRecord function -> sets the details for the clickedRecord function sa itaas.
  //pag click ng record sa table, kukunin nito values tapos ilalagay sa clickedRecord variable tapos gagamitin to populate the textfields
  const handleClickedRecord = (item, isthereAnActiveRow) => {
    //this if is used to check if there is an active row (or may naka-click). if meron, store the values sa clickedRecord variable using setInvetoryRecord function
    if (isthereAnActiveRow) {
      setInventoryRecord({
        id: item.id,
        ingredient: item.ingredient,
        type: item.type,
        typeId: item.typeId,
        weight: item.weight,
        pieces: item.pieces,
        price: item.price,
        expiration: item.expiration,
      });
    }
    //if no record is active(di naka-click), these are the default values for clickedRecord variable
    else {
      setInventoryRecord({
        id: 0,
        ingredient: "",
        type: "Vegetable",
        typeId: 1,
        weight: 0,
        pieces: 0,
        price: 0,
        expiration: format(new Date(), "yyyy-MM-dd"),
      });
    }
  };

  //check mo kung nakuha mo nasa searchbox, at dropdowns !!!!!!
  // console.log("WORD YOU SEARCHED FOR: ", searchValue);
  // console.log("COLUMN YOU CHOSE TO SEARCH IN:", searchedColumn);
  // console.log("ORDER OF RECORDS U CHOSE (ASC OR DESC): ", order);
  // console.log("PERISHABLE OR NAH? ", isPerishable);
  // console.log("RECORD U CLICKED: ", clickedRecord);

  //use this to add, update, delete
  //currentFormRecord = dito ko nilagay yung values mula sa textboxes. bale dito, dineclare lang, not been used yet.
  const [currentFormRecord, setCurrentFormRecord] = useState({
    id: 0,
    ingredient: "",
    type: "Vegetable",
    typeId: 1,
    weight: 0,
    pieces: 0,
    price: 0,
    expiration: format(new Date(), "yyyy-MM-dd"),
  });

  //if clicked ng buttons (add, update, or delete), this function will be executed.
  // we are setting the currentFormRecord (the record to be updated/added sa database) based sa pinasang values mula sa form
  const handleSetInventoryRecord = (textfieldsValues, operation, ID) => {
    setCurrentFormRecord(() => ({
      id: ID,
      ingredient: textfieldsValues.ingredient_field,
      type: textfieldsValues.type_field,
      typeId: textfieldsValues.type_id,
      weight:
        textfieldsValues.quantity_dropdown === "Kg" //if kg yung nasa dropdown, 0 na value ng PCS
          ? textfieldsValues.quantity_field
          : 0,
      pieces:
        textfieldsValues.quantity_dropdown === "Pcs" //if pcs yung nasa dropdown, 0 na value ng Kg
          ? textfieldsValues.quantity_field
          : 0,
      price: textfieldsValues.price_field,
      expiration: textfieldsValues.expiration_picker,
    }));

    setOperation(() => operation); // updates the operatiion variable above. inassign ko dito either "add", "update", "delete"
  };

  //not sure; once the currentFormRecord has been updated(which means nagpasa ng record mula sa textfields tapos nagclick ng button), choose which operation to execute
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
    axios.post('http://localhost:8081/addInventory', record)
    .then((res) => {
      if(res.data === "Failed") {
        alert("This type of ingredient already exists.")
      } else{
        alert("Successfully added new ingedient.")
      }
    })
    .catch((error) => {
      console.log('Error during adding record:', error);
      // Add additional error handling as needed
    });
  };

  //function for updating the currentFormRecord to the database
  const updateRecord = (record) => {
    axios.post('http://localhost:8081/updateInventory', record)
      .then((res) => {
        alert("Successfully Updated Record.")
      })
      .catch((error) => {
        alert('Error during updating record:', error);
        // Add additional error handling as needed
      });
  };

  //function for deleting the currentFormRecord to the database
  const deleteRecord = (record) => {
    axios.post('http://localhost:8081/deleteInventory', record)
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
      <div id="inventory-search-and-sorting">
        <SearchBar handleSearch={handleSearch} inventory_items={inventory_items} setFilteredItems={setFilteredItems}/>
        <SortBy
          options={columns}
          data={filteredItems}
          handleSortColumn={handleSortColumn}
          handleOrder={handleOrder}
          currentOrder={order}
        />
        <Filter handleIsPerishable={handleIsPerishable} />
      </div>

      {/* change column and data props */}
      <div className="inventory-table-wrapper">
        <Table
          columns={Object.keys(inventory_items[0])}
          data={filteredItems || []}
          handleClickedRecord={handleClickedRecord}
        />
      </div>
      <FormSection
        clickedRecord={clickedRecord}
        handleSetInventoryRecord={handleSetInventoryRecord}
      />
    </>
  );
}

function FormSection({ clickedRecord, handleSetInventoryRecord }) {
  //if not 0, use this for updating and deleting record; else, add new record
  const currentID = clickedRecord.id;
  
  //for types
  const[types, setTypes] = useState(
    [
      {
      id: 0,
      type_name: "Vegetable"
      }
    ]
  );

  //variable for tracking the textfields, if may changes sa fields dito i-uupdate
  const [textfields, setTextFieldsValues] = useState({
    ingredient_field: "",
    type_field: "Vegetable",
    type_id: 1,
    price_field: 0,
    quantity_field: "",
    quantity_dropdown: "",
    expiration_picker: format(new Date(), "yyyy-MM-dd"),
  });

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

  //if clickedRecord changes (nagclick ka ng iba or inunclick mo yung record), this will execute
  // inuupdate lang nito yung values sa textfields based on the clickedRecord
  useEffect(() => {
    //Runs only on the first render
    setTextFieldsValues(() => ({
      ingredient_field: clickedRecord.ingredient,
      type_field: clickedRecord.type,
      type_id: clickedRecord.typeId,
      price_field: clickedRecord.price,
      quantity_field:
        clickedRecord.weight > 0 ? clickedRecord.weight : clickedRecord.pieces,
      quantity_dropdown: clickedRecord.weight > 0 ? "Kg" : "Pcs",
      expiration_picker: clickedRecord.expiration,
    }));
  }, [clickedRecord]);

  //pag inuupdate yung textfields (nagtatype sa fields or inuupdate yung dropdowns), naeexecute ito.
  const handleFieldChanges = (attribute, value) => {
    setTextFieldsValues((others) => ({
      ...others,
      [attribute]: value,
    }));
  };

  //pag click ng add button, ipapasa yung values from text fields, along with the operation (add, update, or delete)
  //check the  handleSetInventoryRecord sa TableSection(), dito galing yung values
  const handleOperation = (textfields, operation) => {
    handleSetInventoryRecord(textfields, operation, currentID);
  };

  return (
    <form>
      <div class="inventory-details-wrapper">
        <h2>Details</h2>

        <div id="inventory-details">
          <div id="inv-fields-wrapper">
            <div className="inv-det-row">
              <div>
                <label for="details-ingredient">Ingredient</label>
                <input
                  required
                  type="text"
                  id="details-ingredient"
                  placeholder="Enter ingredient name"
                  value={textfields.ingredient_field}
                  onChange={
                    (e) =>
                      handleFieldChanges("ingredient_field", e.target.value) //calls the function pag nagtatype...; same lang sa ibang oncahnge saibaba
                  }
                />
              </div>
              <div>
                <div className="label-wrapper">
                  <label for="details-type">Type</label>
                  <Link to="/inventory/types-of-wastes">
                    <span className="lbl-add-type">Add new type</span>
                  </Link>
                </div>
                {/* loops through each type of waste and being put as option */}
                <select
                  id="details-type"
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
            <div className="inv-det-row">
              <div>
                <label for="details-price">Price</label>
                <input
                  type="text"
                  id="details-price"
                  placeholder="Enter price (&#8369;)"
                  value={textfields.price_field}
                  onChange={(e) =>
                    handleFieldChanges("price_field", e.target.value)
                  }
                />
              </div>
              <div>
                <label for="details-qty">Quantity</label>
                <div>
                  <input
                    type="text"
                    id="details-qty"
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
          <div id="inv-expiration-wrapper">
            <label for="expiration-date">Expiration-date</label>
            <input
              type="date"
              id="expiration-date"
              value={textfields.expiration_picker}
              onChange={(e) =>
                handleFieldChanges("expiration_picker", e.target.value)
              }
            />
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
