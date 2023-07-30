import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, numParticipatedQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <label htmlFor="numParticipatedQuestions">
        Choose how may question you want to participate?
      </label>
      <div className="input-container">
        <input
          id="numParticipatedQuestions"
          type="range"
          min={Math.round(numQuestions / 100)}
          max={numQuestions}
          value={numParticipatedQuestions}
          onChange={(e) =>
            dispatch({ type: "dataUpdated", payload: e.target.value })
          }
        />
        <span>
          {numParticipatedQuestions < 10 && "0"}
          {numParticipatedQuestions}
        </span>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
