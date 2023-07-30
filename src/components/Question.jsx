import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

function Question({ isSolution }) {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h4>
        {isSolution && `${index + 1}.`} {question.question}
      </h4>
      <Options question={question} isSolution={isSolution} />
    </div>
  );
}

export default Question;
