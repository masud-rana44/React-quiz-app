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
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizStart":
      return { ...state, status: "start" };
    case "nextQuestion":
      return { ...state, index: state.index++ };
    default:
      return new Error("Unknown action " + action);
  }
}

function App() {
  const [{ status, questions, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
            <ProgressBar />
            <Question questions={questions} currentQuestion={index} />
            <Footer dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
