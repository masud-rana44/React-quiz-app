import { useEffect } from "react";

function Footer({ userAnswer, isLast, timesRemaining, dispatch }) {
  const min = Math.floor(timesRemaining / 60);
  const sec = timesRemaining % 60;

  if (timesRemaining === 0) dispatch({ type: "quizSubmit" });

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "updateTimer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <footer>
      {userAnswer && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({ type: isLast ? "quizSubmit" : "nextQuestion" })
          }
        >
          {isLast ? "Finish" : "Next"}
        </button>
      )}

      <div className="timer">
        {min <= 9 ? `0${min}` : min} : {sec <= 9 ? `0${sec}` : sec}
      </div>
    </footer>
  );
}

export default Footer;
