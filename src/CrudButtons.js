import './css/crudButtons.css'

export default function CrudButtons({ handleOperation }) {
  return (
    <div className="button-section">
      <button
        className="op-btn add-btn"
        onClick={(e) => {
          e.preventDefault();
          handleOperation("add");
        }}
      >
        Add Record
      </button>

      <button
        className="op-btn update-btn"
        onClick={(e) => {
          e.preventDefault();
          handleOperation("update");
        }}
      >
        Update Record
      </button>

      <button
        className="op-btn delete-btn"
        onClick={(e) => {
          e.preventDefault();
          handleOperation("delete");
        }}
      >
        Delete Record
      </button>
    </div>
  );
}
