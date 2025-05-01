import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const isLoading = false;
  const isFailed = false;

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {isLoading && <Loader />}
        {isFailed && <ErrorMessage />}

        <h2>Welcome to The React Quiz!</h2>
      </main>
    </div>
  );
}
