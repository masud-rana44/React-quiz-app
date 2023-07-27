import Options from "./Options";

function Question({ questions, currentQuestion, userAnswer, dispatch }) {
  return (
    <div>
      <h4>{questions[currentQuestion].question}</h4>
      <Options
        options={questions[currentQuestion].options}
        userAnswer={userAnswer}
        correctAnswer={questions[currentQuestion].correctOption}
        points={questions[currentQuestion].points}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
