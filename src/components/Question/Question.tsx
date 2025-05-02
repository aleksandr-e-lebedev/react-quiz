import Options from "../Options";

import type { QuestionType } from "@/types";
import type { OptionsProps } from "../Options";

import "./Question.styles.css";

export type QuestionProps = {
  className?: string;
  question: QuestionType;
} & OptionsProps;

export default function Question(props: QuestionProps) {
  const { className, question, answer, onChooseAnswer } = props;

  return (
    <div className={className ? `question ${className}` : "question"}>
      <h4 className="question__title">{question.question}</h4>
      <Options
        question={question}
        answer={answer}
        onChooseAnswer={onChooseAnswer}
      />
    </div>
  );
}
