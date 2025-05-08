import { useReducer, useEffect } from "react";

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

interface State {
  requestStatus: RequestStatus;
  questions: QuestionType[];
  error: Error | null;

  quizStatus: QuizStatus;
  currentQuestionIndex: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

const initialState: State = {
  requestStatus: "idle",
  questions: [],
  error: null,

  quizStatus: "idle",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

type Action =
  | { type: "data_loading" }
  | { type: "data_received"; payload: QuestionType[] }
  | { type: "data_failed"; payload: Error }
  | { type: "quiz_started" }
  | { type: "answer_chosen"; payload: number }
  | { type: "next_question_selected" }
  | { type: "quiz_finished" }
  | { type: "quiz_restarted" }
  | { type: "timer_decreased" };

function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "data_loading": {
      return {
        ...state,
        requestStatus: "pending",
      };
    }
    case "data_received": {
      return {
        ...state,
        requestStatus: "success",
        questions: action.payload,
        quizStatus: "ready",
      };
    }
    case "data_failed": {
      return {
        ...state,
        requestStatus: "failure",
        error: action.payload,
      };
    }
    case "quiz_started": {
      return {
        ...state,
        quizStatus: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    }
    case "answer_chosen": {
      const question = state.questions.at(state.currentQuestionIndex);
      const { payload: answer } = action;

      return {
        ...state,
        answer,
        points:
          question?.correctOption === answer
            ? state.points + question.points
            : state.points,
      };
    }
    case "next_question_selected": {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    }
    case "quiz_finished": {
      return {
        ...state,
        quizStatus: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "quiz_restarted": {
      return {
        ...state,
        quizStatus: "active",
        currentQuestionIndex: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    }
    case "timer_decreased": {
      const timerIsActive = state.secondsRemaining !== 0;

      return {
        ...state,
        quizStatus: timerIsActive ? "active" : "finished",
        secondsRemaining: timerIsActive ? state.secondsRemaining - 1_000 : 0,
      };
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const { requestStatus, questions, error } = state;
  const {
    quizStatus,
    currentQuestionIndex,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

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
    dispatch({ type: "quiz_started" });
  }

  function handleChooseAnswer(answer: number) {
    dispatch({ type: "answer_chosen", payload: answer });
  }

  function handleDecreaseTimer() {
    dispatch({ type: "timer_decreased" });
  }

  function handleSelectNextQuestion() {
    dispatch({ type: "next_question_selected" });
  }

  function handleFinishQuiz() {
    dispatch({ type: "quiz_finished" });
  }

  function handleRestartQuiz() {
    dispatch({ type: "quiz_restarted" });
  }

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch({ type: "data_loading" });
        const res = await fetch(SERVER_URL);
        if (!res.ok) throw new Error(DEFAULT_ERROR_MESSAGE);
        const data = (await res.json()) as QuestionType[];
        dispatch({ type: "data_received", payload: data });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: "data_failed", payload: err });
        } else {
          dispatch({
            type: "data_failed",
            payload: new Error(DEFAULT_ERROR_MESSAGE),
          });
        }
      }
    }
    void fetchQuestions();
  }, []);

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
