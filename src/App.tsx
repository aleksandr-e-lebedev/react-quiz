import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";

import { tempQuestions } from "../temp/data";

export default function App() {
  const questions = tempQuestions;
  const currentQuestionIndex = 0;
  const answer = 1;
  const points = 10;

  const isLoading = false;
  const isFailed = false;
  const isReady = false;
  const isActive = true;

  const numQuestions = questions.length;

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

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
        {isActive && (
          <QuizScreen
            answer={answer}
            currentQuestionIndex={currentQuestionIndex}
            numQuestions={numQuestions}
            points={points}
            maxPoints={maxPoints}
          />
        )}
      </main>
    </div>
  );
}
