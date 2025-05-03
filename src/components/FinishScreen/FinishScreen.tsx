import Button from "../Button";
import "./FinishScreen.styles.css";

export interface FinishScreenProps {
  points: number;
  maxPoints: number;
  highscore: number;
  onRestartQuiz: () => void;
}

export default function FinishScreen(props: FinishScreenProps) {
  const { points, maxPoints, highscore, onRestartQuiz } = props;
  const percentage = Math.ceil((points / maxPoints) * 100);

  let emoji = "🤦‍♂️";

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage > 0 && percentage < 50) emoji = "🤨";

  function handleButtonClick() {
    onRestartQuiz();
  }

  return (
    <div className="finish-screen">
      <p className="finish-screen__result">
        <span className="finish-screen__emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPoints} ({percentage}%)
      </p>

      <p className="finish-screen__highscore">
        (Highscore: {highscore} points)
      </p>

      <Button
        className="finish-screen__restart-button"
        onClick={handleButtonClick}
      >
        Restart quiz
      </Button>
    </div>
  );
}
