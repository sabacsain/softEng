import "./css/recommendation.css";

export default function Recommendation({ setRecommOpen }) {
  function handleClick() {
    setRecommOpen(false);
  }

  return (
    <div className="recomm-container">
      recomm UNDER CONSTRUCTION
      <button onClick={handleClick}>CLOSSSEE</button>
    </div>
  );
}
