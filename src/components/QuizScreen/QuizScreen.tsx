import Progress from "../Progress";
import Question from "../Question";
import Footer from "../Footer";

import "./QuizScreen.styles.css";

export default function QuizScreen() {
  return (
    <div className="quiz-screen">
      <Progress className="quiz-screen__header" />
      <Question className="quiz-screen__question" />
      <Footer />
    </div>
  );
}
