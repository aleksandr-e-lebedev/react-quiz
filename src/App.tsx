import Header from "./components/Header";
import Loader from "./components/Loader";

export default function App() {
  const isLoading = false;
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {isLoading && <Loader />}

        <h2>Welcome to The React Quiz!</h2>
      </main>
    </div>
  );
}
