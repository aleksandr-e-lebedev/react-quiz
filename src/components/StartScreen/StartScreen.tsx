import Button from "../Button";
import { useQuiz, useQuizDispatch } from "@/contexts/QuizContext";
import "./StartScreen.styles.css";

export default function StartScreen() {
  const { questions } = useQuiz();
  const dispatch = useQuizDispatch();
  const numQuestions = questions.length;

  function handleStartQuiz() {
    dispatch({ type: "quiz_started" });
  }

  return (
    <div className="start-screen">
      <h2 className="start-screen__title">Welcome to The React Quiz!</h2>
      <p className="start-screen__subtitle">
        {numQuestions} questions to test your React mastery
      </p>
      <Button onClick={handleStartQuiz}>Let&apos;s start</Button>
    </div>
  );
}
