function ProgressBar({ progress, numOfQuestions, currentQuestion, points }) {
  return (
    <header className="progress">
      <progress value={progress} max={numOfQuestions} />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / 280
      </p>
    </header>
  );
}

export default ProgressBar;
