import { useQuiz } from "../contexts/QuizContext";

function ProgressBar() {
  const { index, numParticipatedQuestions, points, maxPossiblePoints, answer } =
    useQuiz();

  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numParticipatedQuestions}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numParticipatedQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressBar;
