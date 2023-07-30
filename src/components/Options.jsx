import Option from "./Option";

function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <Option
          key={option}
          index={index}
          option={option}
          answer={answer}
          correctOption={question.correctOption}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Options;
