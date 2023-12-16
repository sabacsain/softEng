import { useEffect, useState } from "react";
import { SecondHeader } from "./Header";
import Table from "./Table";
import "./css/typesOfWastes.css";
import Toggle from "./Toggle";
import axios from 'axios';
import CrudButtons from "./CrudButtons";

const columns = ["ID", "Type Name", "Is Perishable"];

export default function TypesOfWaste() {
  
  return (
    <div className="typesOfWastes">
      <SecondHeader title={"Types of Wastes"} />
      <div className="body">
        <TableSection />
      </div>
    </div>
  );
}

function TableSection() {
  const [types, setTypes] = useState(
    [
    { 
      id: 1,
      type_name: "Meat",
      perishable: "false",
    },
  
    {
      id: 2,
      type_name: "Canned",
      perishable: "true",
    }
    ]
  );

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

  const [clickedRecord, setTypeRecord] = useState({
    //holds attributes and values of the record u clicked from the table
    clicked_ID: 0,
    clicked_TYPENAME: "",
    clicked_ISPERISHABLE: "false",
  });

  const [operation, setOperation] = useState(""); //operation = checks if operation chosen is either add, update, or delete

  const handleClickedRecord = (item, isthereAnActiveRow) => {
    //this if is used to check if there is an active row (or may naka-click). if meron, store the values sa clickedRecord variable using setInvetoryRecord function
    if (isthereAnActiveRow) {
      setTypeRecord({
        clicked_ID: item.id,
        clicked_TYPENAME: item.type_name,
        clicked_ISPERISHABLE: item.perishable,
      });
    }

    //if no record is active(di naka-click), these are the default values for clickedRecord variable
    else {
      setTypeRecord({
        clicked_ID: null,
        clicked_TYPENAME: "",
        clicked_ISPERISHABLE: "false",
      });
    }
  };

  //use this to add, update, delete
  //currentFormRecord = dito ko nilagay yung values mula sa textboxes. bale dito, dineclare lang, not been used yet.
  const [currentFormRecord, setCurrentFormRecord] = useState({
    current_ID: null,
    current_TYPENAME: "",
    current_ISPERISHABLE: "false",
  });

  const handleCurrentTypeRecord = (textfieldsValues, operation, ID) => {
    setCurrentFormRecord(() => ({
      current_ID: ID,
      current_TYPENAME: textfieldsValues.tf_TYPENAME,
      current_ISPERISHABLE: textfieldsValues.tf_ISPERISHABLE,
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
    axios.post('http://localhost:8081/addType', record)
      .then((res) => {
        if(res.data === "Failed") {
          alert("This type of waste already exists.")
        } else {
          alert("Successfully Added New Type of Waste.")
        }
      })
      .catch((error) => {
        alert('Error during adding record:', error);
        // Add additional error handling as needed
      });
  }

  //function for updating the currentFormRecord to the database
  const updateRecord = (record) => {
    axios.post('http://localhost:8081/updateType', record)
      .then((res) => {
        alert("Successfully Updated Record.")
        console.log(res.data)
      })
      .catch((error) => {
        alert('Error during updating record:', error);
        // Add additional error handling as needed
      });
  };

  //function for deleting the currentFormRecord to the database
  const deleteRecord = (record) => {
    axios.post('http://localhost:8081/deleteType', record)
      .then((res) => {
        alert("Successfully Deleted Record.")
      })
      .catch((error) => {
        alert('Error during deleting record:', error);
        // Add additional error handling as needed
      });
  };

  //console.log("RECORD U CLICKED: ", clickedRecord);

  return (
    <>
      <div className="inventory-table-wrapper">
        <Table
          columns={columns}
          data={types}
          handleClickedRecord={handleClickedRecord}
        />
      </div>

      <FormSection
        clickedRecord={clickedRecord}
        handleCurrentTypeRecord={handleCurrentTypeRecord}
      />
    </>
  );
}

function FormSection({ clickedRecord, handleCurrentTypeRecord }) {
  //if not 0, use this for updating and deleting record; else, add new record
  const currentID = clickedRecord.clicked_ID;

  //variable for tracking the textfields, if may changes sa fields dito i-uupdate
  const [textfields, setTextFieldsValues] = useState({
    tf_TYPENAME: "",
    tf_ISPERISHABLE: false,
  });

  //if clickedRecord changes (nagclick ka ng iba or inunclick mo yung record), this will execute
  // inuupdate lang nito yung values sa textfields based on the clickedRecord
  useEffect(() => {
    //Runs only on the first render
    setTextFieldsValues(() => ({
      tf_TYPENAME: clickedRecord.clicked_TYPENAME,
      tf_ISPERISHABLE: clickedRecord.clicked_ISPERISHABLE === "true",
    }));
  }, [clickedRecord]);

  const handleIsPerishable = () => {
    setTextFieldsValues((others) => ({
      ...others,
      tf_ISPERISHABLE: !textfields.tf_ISPERISHABLE, //invert previous value
    }));
  };

  //pag inuupdate yung textfields (nagtatype sa fields or inuupdate yung dropdowns), naeexecute ito.
  const handleTypeFieldChanges = (value) => {
    setTextFieldsValues((others) => ({
      ...others,
      tf_TYPENAME: value,
    }));
  };

  //pag click ng add button, ipapasa yung values from text fields, along with the operation (add, update, or delete)
  //check the  handleSetInventoryRecord sa TableSection(), dito galing yung values
  const handleOperation = (textfields, operation) => {
    handleCurrentTypeRecord(textfields, operation, currentID);
  };

  return (
    <>
      <div class="inventory-details-wrapper">
        <h2>Details</h2>
        <div id="inventory-details">
          <div id="inv-fields-wrapper">
            <div className="inv-det-row">
              <div>
                <label for="details-ingredient">Type</label>
                <input
                  required
                  type="text"
                  id="details-ingredient"
                  placeholder="Enter inventory type"
                  value={textfields.tf_TYPENAME}
                  onChange={(e) => handleTypeFieldChanges(e.target.value)}
                />
              </div>
            </div>

            <div className="inv-det-row">
              <div>
                <label>Is Perishable</label>

                <Toggle
                  value={textfields.tf_ISPERISHABLE}
                  handleToggleValue={handleIsPerishable}
                />
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
    </>
  );
}
