import { useState, useEffect } from "react";

import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import FinishScreen from "./components/FinishScreen";

import type { QuestionType } from "./types";
import {
  SECONDS_PER_QUESTION,
  SERVER_URL,
  DEFAULT_ERROR_MESSAGE,
} from "./config";

type RequestStatus = "idle" | "pending" | "success" | "failure";
type QuizStatus = "idle" | "ready" | "active" | "finished";

export default function App() {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const [quizStatus, setQuizStatus] = useState<QuizStatus>("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const highscore = 0;
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const isLoading = requestStatus === "pending";
  const isFailed = requestStatus === "failure" && error;
  const isReady = quizStatus === "ready";
  const isActive = quizStatus === "active";
  const isFinished = quizStatus === "finished";

  const numQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = answer !== null;
  const isLastQuestion = currentQuestionIndex === numQuestions - 1;

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  function handleStartQuiz() {
    setQuizStatus("active");
    setSecondsRemaining(numQuestions * SECONDS_PER_QUESTION);
  }

  function handleChooseAnswer(answer: number) {
    const question = questions.at(currentQuestionIndex);
    setAnswer(answer);
    setPoints(
      question?.correctOption === answer ? points + question.points : points
    );
  }

  function handleDecreaseTimer() {
    const timerIsActive = secondsRemaining !== 0;
    const seconds = timerIsActive ? secondsRemaining - 1_000 : 0;
    setSecondsRemaining(seconds);
    if (!timerIsActive) setQuizStatus("finished");
  }

  function handleSelectNextQuestion() {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setAnswer(null);
  }

  function handleFinishQuiz() {
    return;
  }

  function handleRestartQuiz() {
    return;
  }

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setRequestStatus("pending");
        const res = await fetch(SERVER_URL);
        if (!res.ok) throw new Error(DEFAULT_ERROR_MESSAGE);
        const data = (await res.json()) as QuestionType[];
        setQuestions(data);
        setRequestStatus("success");
      } catch (err) {
        setRequestStatus("failure");
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(DEFAULT_ERROR_MESSAGE));
        }
      }
    }
    void fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length) setQuizStatus("ready");
  }, [questions]);

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
