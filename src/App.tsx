import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import FinishScreen from "./components/FinishScreen";

import { SECONDS_PER_QUESTION } from "./config";
import { tempQuestions } from "../temp/data";

export default function App() {
  const questions = tempQuestions;
  const currentQuestionIndex = 0;
  const answer = 1;
  const points = 10;
  const highscore = 0;
  const secondsRemaining = questions.length * SECONDS_PER_QUESTION;

  const isLoading = false;
  const isFailed = false;
  const isReady = false;
  const isActive = false;
  const isFinished = true;

  const numQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = true;
  const isLastQuestion = currentQuestionIndex === numQuestions - 1;

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  function handleStartQuiz() {
    return;
  }

  function handleChooseAnswer() {
    return;
  }

  function handleDecreaseTimer() {
    return;
  }

  function handleSelectNextQuestion() {
    return;
  }

  function handleFinishQuiz() {
    return;
  }

  function handleRestartQuiz() {
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
            question={currentQuestion}
            answer={answer}
            currentQuestionIndex={currentQuestionIndex}
            numQuestions={numQuestions}
            points={points}
            maxPoints={maxPoints}
            onChooseAnswer={handleChooseAnswer}
            secondsRemaining={secondsRemaining}
            onDecreaseTimer={handleDecreaseTimer}
            hasAnswered={hasAnswered}
            isLastQuestion={isLastQuestion}
            onSelectNextQuestion={handleSelectNextQuestion}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
        {isFinished && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            onRestartQuiz={handleRestartQuiz}
          />
        )}
      </main>
    </div>
  );
}
