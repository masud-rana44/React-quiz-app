import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Question from "./components/Question";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import FinalScreen from "./components/FinalScreen";
import "./index.css";

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  userAnswer: null,
  points: 0,
  progress: 0,
  highScore: 0,
  timesRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "quizStart":
      return {
        ...state,
        timesRemaining: state.questions.length * 30,
        status: "start",
      };
    case "updateTimer":
      return {
        ...state,
        timesRemaining: state.timesRemaining - 1,
      };
    case "selectAnswer":
      return {
        ...state,
        progress: state.progress++,
        points: state.points + action.points,
        userAnswer: action.payload,
      };
    case "nextQuestion":
      return { ...state, userAnswer: null, index: state.index++ };
    case "quizSubmit":
      return {
        ...state,
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
        status: "submit",
      };
    case "quizReset":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      return new Error("Unknown action " + action);
  }
}

function App() {
  const [
    {
      status,
      questions,
      index,
      userAnswer,
      points,
      progress,
      highScore,
      timesRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const isLast = index === numOfQuestions - 1;
  const totalPoints = questions
    ?.map((ques) => ques.points)
    .reduce((cur, acc) => (acc += cur), 0);

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
              totalPoints={totalPoints}
            />
            <Question
              questions={questions}
              currentQuestion={index}
              userAnswer={userAnswer}
              dispatch={dispatch}
            />
            <Footer
              userAnswer={userAnswer}
              isLast={isLast}
              timesRemaining={timesRemaining}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "submit" && (
          <FinalScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
