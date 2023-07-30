import Option from "./Option";
import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index } = useQuiz();

  return (
    <div className="options">
      {questions[index].options.map((option, index) => (
        <Option key={option} optionIndex={index} option={option} />
      ))}
    </div>
  );
}

export default Options;
