import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Error from "./components/Error";
import Loader from "./components/Loader";
import "./index.css";

const initialState = {
  loading: true,
  error: false,
  questions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ready":
      return { ...state, loading: false, questions: action.payload };
    case "error":
      return { ...state, error: true };
  }
}

function App() {
  const [{ loading, error, questions }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ready", payload: data }))
      .catch(() => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {error && <Error />}
        {loading && <Loader />}
        <StartScreen numOfQuestions={numOfQuestions} />
      </Main>
    </div>
  );
}

export default App;
