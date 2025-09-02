import Button from "../Button";
import { useQuiz, useQuizDispatch } from "@/contexts/QuizContext";
import "./Options.styles.css";

export default function Options() {
  const { questions, currentQuestionIndex, answer } = useQuiz();
  const dispatch = useQuizDispatch();

  const question = questions[currentQuestionIndex];
  const hasAnswered = answer !== null;

  function handleChooseAnswer(answer: number) {
    dispatch({ type: "answer_chosen", payload: answer });
  }

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
            handleChooseAnswer(index);
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
