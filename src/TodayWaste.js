import { useEffect, useState } from "react";
import Header from "./Header";
import Table from "./Table.js";

import "./css/todaywaste.css";

// sample data
//sample columns
const columns = ["Ingredient", "Type", "Pcs", "Kgs", "Price"];

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
  },
  {
    id: 12,
    Ingredient: "Ground Beef",
    Type: "Meat",
    Pcs: 0,
    Kgs: 25,
    Price: 500,
  },
];
////////////////////////////

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
  const [clickedRecord, setTodayWasteRecord] = useState({
    //holds attributes and values of the record u clicked from the table
    id: 0,
    ingredient: "",
    type: "",
    weight: 0,
    pieces: 0,
    price: 0,
  });

  const [operation, setOperation] = useState(""); //operation = checks if operation chosen is either add, update, or delete

  const handleClickedRecord = (item, isthereAnActiveRow) => {
    //this if is used to check if there is an active row (or may naka-click). if meron, store the values sa clickedRecord variable using setInvetoryRecord function
    if (isthereAnActiveRow) {
      setTodayWasteRecord({
        id: item.id,
        ingredient: item.Ingredient,
        type: item.Type,
        weight: item.Kgs,
        pieces: item.Pcs,
        price: item.Price,
      });
    }

    //if no record is active(di naka-click), these are the default values for clickedRecord variable
    else {
      setTodayWasteRecord({
        id: 0,
        ingredient: "",
        type: "",
        weight: 0,
        pieces: 0,
        price: 0,
      });
    }
  };

  //use this to add, update, delete
  //currentFormRecord = dito ko nilagay yung values mula sa textboxes. bale dito, dineclare lang, not been used yet.
  const [currentFormRecord, setCurrentFormRecord] = useState({
    id: 0,
    ingredient: "",
    type: "",
    weight: 0,
    pieces: 0,
    price: 0,
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

  console.log("RECORD U CLICKED: ", clickedRecord);

  return (
    <>
      <div id="waste-table">
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

function FormSection({
  clickedRecord,
  handleSetInventoryRecord,
  addRecord,
  updateRecord,
  deleteRecord,
}) {
  //if not 0, use this for updating and deleting record; else, add new record
  const currentID = clickedRecord.id;

  //variable for tracking the textfields, if may changes sa fields dito i-uupdate
  const [textfields, setTextFieldsValues] = useState({
    ingredient_field: "",
    type_field: "",
    price_field: 0,
    quantity_field: "",
    quantity_dropdown: "",
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
      <div class="today-waste-details-wrapper">
        <h2>Details</h2>

        <div id="today-waste-details">
          <div id="today-fields-wrapper">
            <div className="today-det-row">
              <div>
                <label for="waste-ingredient">Waste</label>
                <input
                  required
                  type="text"
                  id="waste-ingredient"
                  placeholder="Enter ingredient name"
                  value={textfields.ingredient_field}
                  onChange={
                    (e) =>
                      handleFieldChanges("ingredient_field", e.target.value) //calls the function pag nagtatype...; same lang sa ibang oncahnge saibaba
                  }
                />
              </div>
              <div>
                <label for="waste-type">Type</label>
                {/* loops through each type of waste and being put as option */}
                <select
                  id="waste-type"
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
