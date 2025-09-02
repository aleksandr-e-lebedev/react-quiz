import reactLogo from "@/assets/react.svg";
import "./Header.styles.css";

export default function Header() {
  return (
    <header className="app__header">
      <img className="app__logo" src={reactLogo} alt="React logo" />
      <h1 className="app__title">The React Quiz</h1>
    </header>
  );
}
