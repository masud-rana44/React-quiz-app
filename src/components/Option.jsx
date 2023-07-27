function Option({ optionName, userAnswer, correctAnswer, points, dispatch }) {
  const isCorrect = correctAnswer === optionName;
  const isSelect = userAnswer === optionName;

  return (
    <button
      className={`btn btn-option ${
        userAnswer && (isCorrect ? "correct" : "wrong")
      } ${userAnswer && (isSelect ? "answer" : "")}`}
      disabled={userAnswer}
      onClick={() =>
        dispatch({
          type: "selectAnswer",
          payload: optionName,
          points: isCorrect ? points : 0,
        })
      }
    >
      {optionName}
    </button>
  );
}

export default Option;
