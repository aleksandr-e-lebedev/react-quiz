import "./Loader.styles.css";

export default function Loader() {
  return (
    <div className="loader-container app__loader">
      <div className="loader" />
      <p>Loading questions...</p>
    </div>
  );
}
