function FinalScreen({ points, highScore, totalPoints, dispatch }) {
  const percentage = Math.floor((points / totalPoints) * 100);

  let emoji;
  if (percentage === 0) emoji = "😖";
  if (percentage > 0) emoji = "😟";
  if (percentage > 30) emoji = "😐";
  if (percentage > 50) emoji = "🙃";
  if (percentage > 80) emoji = "🧐";
  if (percentage === 100) emoji = "😵";

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored {points} out of {totalPoints} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quizReset" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinalScreen;
