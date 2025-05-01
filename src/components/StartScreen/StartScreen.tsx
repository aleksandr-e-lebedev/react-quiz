import Button from "../Button";
import "./StartScreen.styles.css";

export interface StartScreenProps {
  numQuestions: number;
  onStartQuiz: () => void;
}

export default function StartScreen(props: StartScreenProps) {
  const { numQuestions, onStartQuiz } = props;

  function handleButtonClick() {
    onStartQuiz();
  }

  return (
    <div className="start-screen">
      <h2 className="start-screen__title">Welcome to The React Quiz!</h2>
      <p className="start-screen__subtitle">
        {numQuestions} questions to test your React mastery
      </p>
      <Button onClick={handleButtonClick}>Let&apos;s start</Button>
    </div>
  );
}
