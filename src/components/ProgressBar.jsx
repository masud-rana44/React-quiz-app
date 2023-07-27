function ProgressBar({
  progress,
  numOfQuestions,
  currentQuestion,
  points,
  totalPoints,
}) {
  return (
    <header className="progress">
      <progress value={progress} max={numOfQuestions} />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
