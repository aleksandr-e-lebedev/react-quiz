import "./Progress.styles.css";

export interface ProgressProps {
  className?: string;
  answer: number | null;
  currentQuestionIndex: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
}

export default function Progress(props: ProgressProps) {
  const {
    className,
    answer,
    currentQuestionIndex,
    numQuestions,
    points,
    maxPoints,
  } = props;

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
