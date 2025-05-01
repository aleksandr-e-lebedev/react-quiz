import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";

import { tempQuestions } from "../temp/data";

export default function App() {
  const questions = tempQuestions;

  const isLoading = false;
  const isFailed = false;
  const isReady = true;

  const numQuestions = questions.length;

  function handleStartQuiz() {
    return;
  }

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {isLoading && <Loader />}
        {isFailed && <ErrorMessage />}
        {isReady && (
          <StartScreen
            numQuestions={numQuestions}
            onStartQuiz={handleStartQuiz}
          />
        )}
      </main>
    </div>
  );
}
