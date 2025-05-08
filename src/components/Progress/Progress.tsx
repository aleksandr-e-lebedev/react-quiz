import { useQuiz } from "@/contexts/QuizContext";
import "./Progress.styles.css";

export interface ProgressProps {
  className?: string;
}

export default function Progress({ className }: ProgressProps) {
  const { questions, currentQuestionIndex, answer, points } = useQuiz();

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <header className={className ? `progress ${className}` : "progress"}>
      <progress
        className="progress__progress"
        value={answer ? currentQuestionIndex + 1 : currentQuestionIndex}
        max={numQuestions}
      />

      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
