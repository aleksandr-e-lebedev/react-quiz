import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import FinishScreen from "./components/FinishScreen";

import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const { requestStatus, quizStatus } = useQuiz();

  const isLoading = requestStatus === "pending";
  const isFailed = requestStatus === "failure";
  const isReady = quizStatus === "ready";
  const isActive = quizStatus === "active";
  const isFinished = quizStatus === "finished";

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {isLoading && <Loader />}
        {isFailed && <ErrorMessage />}
        {isReady && <StartScreen />}
        {isActive && <QuizScreen />}
        {isFinished && <FinishScreen />}
      </main>
    </div>
  );
}
