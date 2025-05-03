import Progress from "../Progress";
import Question from "../Question";
import Footer from "../Footer";

import type { ProgressProps } from "../Progress";
import type { QuestionProps } from "../Question";
import type { FooterProps } from "../Footer";

import "./QuizScreen.styles.css";

export type QuizScreenProps = ProgressProps & QuestionProps & FooterProps;

export default function QuizScreen(props: QuizScreenProps) {
  const {
    question,
    answer,
    currentQuestionIndex,
    numQuestions,
    points,
    maxPoints,
    onChooseAnswer,
    secondsRemaining,
    onDecreaseTimer,
    hasAnswered,
    isLastQuestion,
    onSelectNextQuestion,
    onFinishQuiz,
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
      <Footer
        secondsRemaining={secondsRemaining}
        onDecreaseTimer={onDecreaseTimer}
        hasAnswered={hasAnswered}
        isLastQuestion={isLastQuestion}
        onSelectNextQuestion={onSelectNextQuestion}
        onFinishQuiz={onFinishQuiz}
      />
    </div>
  );
}
