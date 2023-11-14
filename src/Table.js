import "./css/table.css";

export default function Table({ columns, data, handleClickedRecord }) {
  return (
    <table>
      <TableHeader columns={columns} />
      <TableData data={data} handleClickedRecord={handleClickedRecord} />
    </table>
  );
}

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
  //loop through each object in the data array. then for each array, render a table row  wherein each td corresponds to one attribute on an object (ex. id, ingredient, type, ..., expiration)
  return data.map((item, index) => (
    <tr onClick={() => handleClickedRecord(item)} id={`${item.id}`}>
      {Object.entries(item).map(([key, value]) =>
        key === "id" ? null : <td>{value}</td>
      )}
    </tr>
  ));
}

//sample columns NA PINASA FROM INVENTORY to TABLE
// const columns = [
//     "Ingredient",
//     "Type",
//     "Price",
//     "Kgs",
//     "Pcs",
//     "Expiration Date",
//   ];

//   //sample data
//   const inventory_items = [
//     {
//       id: 23,
//       Ingredient: "Carrot",
//       Type: "Vegetable",
//       Kgs: 0,
//       Price: 250,
//       Pcs: 100,
//       Expiration: "12-02-2023",
//     },
//     {
//       id: 12,
//       Ingredient: "Ground Beef",
//       Type: "Meat",
//       Kgs: 25,
//       Price: 500,
//       Pcs: 100,
//       Expiration: "12-02-2023",
//     },
//   ];
