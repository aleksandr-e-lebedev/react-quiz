import Timer from "../Timer";
import Button from "../Button";

import type { TimerProps } from "../Timer";
import "./Footer.styles.css";

interface NextQuestionButtonProps {
  onSelectNextQuestion: () => void;
}

function NextQuestionButton(props: NextQuestionButtonProps) {
  const { onSelectNextQuestion } = props;
  return <Button onClick={onSelectNextQuestion}>Next</Button>;
}

interface FinishQuizButtonProps {
  onFinishQuiz: () => void;
}

function FinishQuizButton(props: FinishQuizButtonProps) {
  const { onFinishQuiz } = props;
  return <Button onClick={onFinishQuiz}>Finish</Button>;
}

export type FooterProps = {
  className?: string;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  onSelectNextQuestion: () => void;
  onFinishQuiz: () => void;
} & TimerProps;

export default function Footer(props: FooterProps) {
  const {
    className,
    secondsRemaining,
    onDecreaseTimer,
    hasAnswered,
    isLastQuestion,
    onSelectNextQuestion,
    onFinishQuiz,
  } = props;

  return (
    <footer className={className ? `footer ${className}` : "footer"}>
      <Timer
        secondsRemaining={secondsRemaining}
        onDecreaseTimer={onDecreaseTimer}
      />
      {hasAnswered && !isLastQuestion && (
        <NextQuestionButton onSelectNextQuestion={onSelectNextQuestion} />
      )}
      {hasAnswered && isLastQuestion && (
        <FinishQuizButton onFinishQuiz={onFinishQuiz} />
      )}
    </footer>
  );
}
