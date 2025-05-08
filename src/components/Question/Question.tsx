import Options from "../Options";
import { useQuiz } from "@/contexts/QuizContext";
import "./Question.styles.css";

export interface QuestionProps {
  className?: string;
}

export default function Question({ className }: QuestionProps) {
  const { questions, currentQuestionIndex } = useQuiz();
  const question = questions[currentQuestionIndex];

  return (
    <div className={className ? `question ${className}` : "question"}>
      <h4 className="question__title">{question.question}</h4>
      <Options />
    </div>
  );
}
