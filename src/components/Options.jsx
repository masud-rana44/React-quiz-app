import Option from "./Option";

function Options({ options, userAnswer, correctAnswer, points, dispatch }) {
  return (
    <div className="options">
      {options.map((option) => (
        <Option
          key={option}
          optionName={option}
          userAnswer={userAnswer}
          correctAnswer={options[correctAnswer]}
          points={points}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Options;
