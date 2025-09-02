/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

import type { QuestionType } from "@/types";
import {
  SECONDS_PER_QUESTION,
  SERVER_URL,
  DEFAULT_ERROR_MESSAGE,
} from "@/config";

type RequestStatus = "idle" | "pending" | "success" | "failure";
type QuizStatus = "idle" | "ready" | "active" | "finished";

interface QuizState {
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

const initialState: QuizState = {
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

type QuizAction =
  | { type: "data_loading" }
  | { type: "data_received"; payload: QuestionType[] }
  | { type: "data_failed"; payload: Error }
  | { type: "quiz_started" }
  | { type: "answer_chosen"; payload: number }
  | { type: "next_question_selected" }
  | { type: "quiz_finished" }
  | { type: "quiz_restarted" }
  | { type: "timer_decreased" };

function stateReducer(state: QuizState, action: QuizAction): QuizState {
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

const QuizContext = createContext<QuizState | null>(null);
QuizContext.displayName = "QuizState";

type QuizDispatchContextType = React.ActionDispatch<
  [action: QuizAction]
> | null;

const QuizDispatchContext = createContext<QuizDispatchContextType>(null);
QuizDispatchContext.displayName = "QuizDispatch";

interface QuizProviderProps {
  children: React.ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

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
    <QuizContext.Provider value={state}>
      <QuizDispatchContext value={dispatch}>{children}</QuizDispatchContext>
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const quizState = useContext(QuizContext);

  if (!quizState)
    throw new Error("useQuiz must be used within the QuizProvider");

  return quizState;
}

export function useQuizDispatch() {
  const quizDispatch = useContext(QuizDispatchContext);

  if (!quizDispatch)
    throw new Error("useQuizDispatch must be used within the QuizProvider");

  return quizDispatch;
}
