import Button from "../Button";
import { useQuiz, useQuizDispatch } from "@/contexts/QuizContext";
import "./FinishScreen.styles.css";

export default function FinishScreen() {
  const { questions, points, highscore } = useQuiz();
  const dispatch = useQuizDispatch();

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  const percentage = Math.ceil((points / maxPoints) * 100);

  function handleRestartQuiz() {
    dispatch({ type: "quiz_restarted" });
  }

  let emoji = "🤦‍♂️";

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage > 0 && percentage < 50) emoji = "🤨";

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
        onClick={handleRestartQuiz}
      >
        Restart quiz
      </Button>
    </div>
  );
}
