import { useQuiz } from "../contexts/QuizContext";

function Option({ option, optionIndex }) {
  const { answer, questions, index, dispatch } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <button
      className={`btn btn-option ${optionIndex === answer ? "answer" : ""} ${
        hasAnswered
          ? optionIndex === questions[index].correctOption
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
