import Option from "./Option";

function Options({ question, isSolution }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <Option
          key={option}
          optionIndex={index}
          option={option}
          question={question}
          isSolution={isSolution}
        />
      ))}
    </div>
  );
}

export default Options;
