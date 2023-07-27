import Options from "./Options";

function Question({ questions, currentQuestion }) {
  return (
    <div>
      <h4>{questions[currentQuestion].question}</h4>
      <Options options={questions[currentQuestion].options} />
    </div>
  );
}

export default Question;
