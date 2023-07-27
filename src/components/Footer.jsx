function Footer({ userAnswer, dispatch }) {
  return (
    <footer>
      {userAnswer && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </footer>
  );
}

export default Footer;
