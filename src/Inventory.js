import { useEffect, useState } from "react";
import "./css/inventory.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {SearchBar, SortBy, Filter} from "./Search.js";
import Table from "./Table.js";
import { format } from "date-fns";

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

//sample types
const types = ["Vegetable", "Meat", "A", "B", "C"];

//sample data
const inventory_items = [
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
        <h1>Inventory palitan niyo nalang pag magulo na HAHHA</h1>
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

        <h3 class="h3-inventory tomorrow">Tomorrow (10)</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
          <div>Strawberryf jkdljfksf</div>
          <div>Strawberry fsdfsdf</div>
          <div>Strawberr f dfsfy</div>
          <div>Strawberry fdfsf</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberrdfsdfdsfy</div>
          <div>Strawbersfsdry</div>

          {/* <!-- DATABASE LIST --> */}
        </div>

        <h3 class="h3-inventory thisweek">This Week</h3>
        <hr></hr>
        <div className="notif-entries-wrapper">
          <div>Strawberryf jkdljfksf</div>
          <div>Strawberry fsdfsdf</div>
          <div>Strawberr f dfsfy</div>
          <div>Strawberry fdfsf</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberry</div>
          <div>Strawberrdfsdfdsfy</div>
          <div>Strawbersfsdry</div>

          {/* <!-- DATABASE LIST --> */}
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
  //for query
  const [searchValue, setSearchValue] = useState(""); //holds the value you type in the searchbox
  const [searchedColumn, setSearchedColumn] = useState("Ingredient"); //hold the chosen column beside the sortby
  const [order, setOrder] = useState("ASC"); //holds the chosen order, ASC or DESC
  const [isPerishable, setIsPerishable] = useState(true); //hpersihable or non

  const [clickedRecord, setInventoryRecord] = useState({
    //holds attributes and values of the record u clicked from the table
    id: 0,
    ingredient: "",
    type: "",
    weight: 0,
    pieces: 0,
    price: 0,
    expiration: format(new Date(), "yyyy-MM-dd"),
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
        ingredient: item.Ingredient,
        type: item.Type,
        weight: item.Kgs,
        pieces: item.Pcs,
        price: item.Price,
        expiration: item.Expiration,
      });
    }

    //if no record is active(di naka-click), these are the default values for clickedRecord variable
    else {
      setInventoryRecord({
        id: 0,
        ingredient: "",
        type: "",
        weight: 0,
        pieces: 0,
        price: 0,
        expiration: format(new Date(), "yyyy-MM-dd"),
      });
    }
  };

  //check mo kung nakuha mo nasa searchbox, at dropdowns !!!!!!
  console.log("WORD YOU SEARCHED FOR: ", searchValue);
  console.log("COLUMN YOU CHOSE TO SEARCH IN:", searchedColumn);
  console.log("ORDER OF RECORDS U CHOSE (ASC OR DESC): ", order);
  console.log("PERISHABLE OR NAH? ", isPerishable);
  console.log("RECORD U CLICKED: ", clickedRecord);

  //use this to add, update, delete
  //currentFormRecord = dito ko nilagay yung values mula sa textboxes. bale dito, dineclare lang, not been used yet.
  const [currentFormRecord, setCurrentFormRecord] = useState({
    id: 0,
    ingredient: "",
    type: "",
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
    //insert code to add record to database
    console.log("ADD TO DATABASE ->  ", record);
  };

  //function for updating the currentFormRecord to the database
  const updateRecord = (record) => {
    //insert code to update record from database
    console.log("UPDATE THIS ID ->", record.id);
    console.log("UPDATED DETAILS:", record);
  };

  //function for deleting the currentFormRecord to the database
  const deleteRecord = (record) => {
    //insert code to update record from database
    console.log("DELETE THIS ID:", record.id);
    console.log("DELETE THIS RECORD:", record);
  };

  return (
    <>
      <div id="inventory-search-and-sorting">
        <SearchBar handleSearch={handleSearch} />
        <SortBy
          options={columns}
          handleSortColumn={handleSortColumn}
          handleOrder={handleOrder}
          currentOrder={order}
        />
        <Filter handleIsPerishable={handleIsPerishable} />
      </div>

      {/* change column and data props */}
      <div className="inventory-table-wrapper">
        <Table
          columns={columns}
          data={inventory_items}
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

function FormSection({ clickedRecord, handleSetInventoryRecord }) {
  //if not 0, use this for updating and deleting record; else, add new record
  const currentID = clickedRecord.id;

  //variable for tracking the textfields, if may changes sa fields dito i-uupdate
  const [textfields, setTextFieldsValues] = useState({
    ingredient_field: "",
    type_field: "",
    price_field: 0,
    quantity_field: "",
    quantity_dropdown: "",
    expiration_picker: format(new Date(), "yyyy-MM-dd"),
  });

  //if clickedRecord changes (nagclick ka ng iba or inunclick mo yung record), this will execute
  // inuupdate lang nito yung values sa textfields based on the clickedRecord
  useEffect(() => {
    //Runs only on the first render
    setTextFieldsValues(() => ({
      ingredient_field: clickedRecord.ingredient,
      type_field: clickedRecord.type,
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
                <label for="details-type">Type</label>
                {/* loops through each type of waste and being put as option */}
                <select
                  id="details-type"
                  value={textfields.type_field}
                  onChange={(e) =>
                    handleFieldChanges("type_field", e.target.value)
                  }
                >
                  {types.map((type) => (
                    <option value={`${type}`}>{type}</option>
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
        <div className="button-section">
          <button
            className="op-btn add-btn"
            onClick={(e) => {
              e.preventDefault();
              handleOperation(textfields, "add"); //calls handleOperation then ipapasa naman ng handleOperation yung values ng textfields pati "add" pati ID sa may handleSetInventoryRecord
            }}
          >
            Add Record
          </button>

          <button
            className="op-btn update-btn"
            onClick={(e) => {
              e.preventDefault();
              handleOperation(textfields, "update"); //calls handleOperation then ipapasa naman ng handleOperation yung values ng textfields pati "add" pati ID sa may handleSetInventoryRecord
            }}
          >
            Update Record
          </button>

          <button
            className="op-btn delete-btn"
            onClick={(e) => {
              e.preventDefault();
              handleOperation(textfields, "delete"); //calls handleOperation then ipapasa naman ng handleOperation yung values ng textfields pati "add" pati ID sa may handleSetInventoryRecord
            }}
          >
            Delete Record
          </button>
        </div>
      </div>
    </form>
  );
}
