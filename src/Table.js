import { useState } from "react";
import "./css/table.css";

//needs column, data, and function to track active records
export default function Table({ columns, data, handleClickedRecord }) {
  return (
    <table>
      <TableHeader columns={columns} />
      {/* handleClickedRecord -> to track active records (record you clicked) */}
      <TableData data={data} handleClickedRecord={handleClickedRecord} />
    </table>
  );
}

//this component uses columns array to render thead
function TableHeader({ columns }) {
  return (
    <thead className="thead">
      {columns.map((column) => (
        <th id={column}>{column}</th>
      ))}
    </thead>
  );
}

function TableData({ data, handleClickedRecord }) {
  const [activeRowId, setActiveRowId] = useState(0);

  //if record was clicked, if it is not yet active -> make it active; else, remove its active state
  function HandleClick(item) {
    const activeRow = item.id === activeRowId ? 0 : item.id;
    setActiveRowId(activeRow);
    if (handleClickedRecord != null) {
      handleClickedRecord(item, activeRow !== 0);
    }
  }
  //loop through each object in the data array. then for each array, render a table row  wherein each td corresponds to one attribute on an object (ex. id, ingredient, type, ..., expiration)
  return data.map((item, index) => (
    <tr
      //apply active-row class to a tr which is active
      className={`${activeRowId === item.id ? "active-row" : ""}`}
      onClick={() => HandleClick(item)}
      id={`${item.id}`}
    >
      {Object.entries(item).map(([key, value]) => (
        <td>{value}</td>
      ))}
    </tr>
  ));
}
