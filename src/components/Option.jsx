import { useQuiz } from "../contexts/QuizContext";

function Option({ option, optionIndex, question, isSolution }) {
  const { index, answer, allAnswers, dispatch } = useQuiz();
  const hasAnswered = answer !== null || isSolution;

  return (
    <button
      className={`btn btn-option ${
        (!isSolution && optionIndex === answer) ||
        (isSolution && optionIndex === allAnswers[index])
          ? "answer"
          : ""
      } ${
        hasAnswered
          ? optionIndex === question.correctOption
            ? "correct"
            : "wrong"
          : ""
      }`}
      disabled={hasAnswered}
      onClick={() =>
        dispatch({
          type: "newAnswer",
          payload: optionIndex,
        })
      }
    >
      {option}
    </button>
  );
}

export default Option;
