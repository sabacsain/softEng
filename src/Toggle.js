import "./css/toggle.css"

export default function Toggle({ value, handleToggleValue }) {  
    return (
      <label id="toggle-theme" className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={handleToggleValue}
        />
        <span className="slider" />
      </label>
    );
  }
  