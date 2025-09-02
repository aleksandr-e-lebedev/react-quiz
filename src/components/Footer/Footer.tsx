import Timer from "../Timer";
import Button from "../Button";

import { useQuiz, useQuizDispatch } from "@/contexts/QuizContext";
import "./Footer.styles.css";

function NextQuestionButton() {
  const dispatch = useQuizDispatch();

  function handleSelectNextQuestion() {
    dispatch({ type: "next_question_selected" });
  }

  return <Button onClick={handleSelectNextQuestion}>Next</Button>;
}

function FinishQuizButton() {
  const dispatch = useQuizDispatch();

  function handleFinishQuiz() {
    dispatch({ type: "quiz_finished" });
  }

  return <Button onClick={handleFinishQuiz}>Finish</Button>;
}

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { questions, currentQuestionIndex, answer, secondsRemaining } =
    useQuiz();

  const dispatch = useQuizDispatch();

  const hasAnswered = answer !== null;
  const numQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === numQuestions - 1;

  function handleDecreaseTimer() {
    dispatch({ type: "timer_decreased" });
  }

  return (
    <footer className={className ? `footer ${className}` : "footer"}>
      <Timer
        secondsRemaining={secondsRemaining}
        onDecreaseTimer={handleDecreaseTimer}
      />
      {hasAnswered && !isLastQuestion && <NextQuestionButton />}
      {hasAnswered && isLastQuestion && <FinishQuizButton />}
    </footer>
  );
}
