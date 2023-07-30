import { useQuiz } from "../contexts/QuizContext";

function NextButton({ isSolution }) {
  const { dispatch, answer, index, numParticipatedQuestions } = useQuiz();

  if (
    (!isSolution && answer === null) ||
    (isSolution && index === numParticipatedQuestions - 1)
  )
    return "";

  if (index < numParticipatedQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numParticipatedQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
