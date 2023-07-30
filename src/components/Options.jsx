import Option from "./Option";

function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <Option
          key={option}
          optionIndex={index}
          option={option}
          question={question}
        />
      ))}
    </div>
  );
}

export default Options;
