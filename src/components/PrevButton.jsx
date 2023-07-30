import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, index } = useQuiz();

  // if (answer === null) return null;

  if (index > 0)
    return (
      <button
        className="btn btn-ui prevBtn"
        onClick={() => dispatch({ type: "prevQuestion" })}
      >
        Prev
      </button>
    );

  if (index === 0)
    return (
      <button
        className="btn btn-ui prevBtn"
        onClick={() => dispatch({ type: "finish" })}
      >
        Back
      </button>
    );
}

export default NextButton;
