import Progress from "../Progress";
import type { ProgressProps } from "../Progress";
import "./QuizScreen.styles.css";

export type QuizScreenProps = ProgressProps;

export default function QuizScreen(props: QuizScreenProps) {
  const { answer, currentQuestionIndex, numQuestions, points, maxPoints } =
    props;

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
      <div className="quiz-screen__question">Question</div>
      <footer className="quiz-screen__footer">Footer</footer>
    </div>
  );
}
