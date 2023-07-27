import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Question from "./components/Question";
import Footer from "./components/Footer";
import "./index.css";
import ProgressBar from "./components/ProgressBar";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  userAnswer: null,
  points: 0,
  progress: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "quizStart":
      return { ...state, status: "start" };
    case "selectAnswer":
      return {
        ...state,
        progress: state.progress++,
        points: state.points + action.points,
        userAnswer: action.payload,
      };
    case "nextQuestion":
      return { ...state, userAnswer: null, index: state.index++ };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      return new Error("Unknown action " + action);
  }
}

function App() {
  const [{ status, questions, index, userAnswer, points, progress }, dispatch] =
    useReducer(reducer, initialState);

  const numOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <ProgressBar
              progress={progress}
              currentQuestion={index}
              numOfQuestions={numOfQuestions}
              points={points}
            />
            <Question
              questions={questions}
              currentQuestion={index}
              userAnswer={userAnswer}
              dispatch={dispatch}
            />
            <Footer userAnswer={userAnswer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
