import Progress from "../Progress";
import Question from "../Question";

import type { ProgressProps } from "../Progress";
import type { QuestionProps } from "../Question";

import "./QuizScreen.styles.css";

export type QuizScreenProps = ProgressProps & QuestionProps;

export default function QuizScreen(props: QuizScreenProps) {
  const {
    question,
    answer,
    currentQuestionIndex,
    numQuestions,
    points,
    maxPoints,
    onChooseAnswer,
  } = props;

  return (
    <div className="quiz-screen">
      <Progress
        className="quiz-screen__header"
        answer={answer}
        currentQuestionIndex={currentQuestionIndex}
        numQuestions={numQuestions}
        points={points}
        maxPoints={maxPoints}
      />
      <Question
        className="quiz-screen__question"
        question={question}
        answer={answer}
        onChooseAnswer={onChooseAnswer}
      />
      <footer className="quiz-screen__footer">Footer</footer>
    </div>
  );
}
