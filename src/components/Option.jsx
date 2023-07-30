import { useQuiz } from "../contexts/QuizContext";

function Option({ option, optionIndex, question }) {
  const { answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <button
      className={`btn btn-option ${optionIndex === answer ? "answer" : ""} ${
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
