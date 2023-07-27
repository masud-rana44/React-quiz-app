function Footer({ dispatch }) {
  return (
    <footer>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </footer>
  );
}

export default Footer;
