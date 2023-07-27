import Option from "./Option";

function Options({ options }) {
  return (
    <div className="options">
      {options.map((option) => (
        <Option key={option} optionName={option} />
      ))}
    </div>
  );
}

export default Options;
