import Button from "../Button";
import type { QuestionType } from "@/types";
import "./Options.styles.css";

export interface OptionsProps {
  question: QuestionType;
  answer: number | null;
  onChooseAnswer: (answer: number) => void;
}

export default function Options(props: OptionsProps) {
  const { question, answer, onChooseAnswer } = props;
  const hasAnswered = answer !== null;

  function getClassName(optionIndex: number) {
    let className = "";

    if (hasAnswered) {
      className =
        question.correctOption === optionIndex
          ? "options__option_correct"
          : "options__option_wrong";
    }

    if (answer === optionIndex) {
      className += " options__answer";
    }

    return className;
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <Button
          key={option}
          className={`options__option ${getClassName(index)}`}
          disabled={hasAnswered}
          onClick={() => {
            onChooseAnswer(index);
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
