import { createContext, useReducer, useContext, useEffect } from "react";
import { getRandomQuestions } from "../utils";

const QuizContext = createContext();

const SECS_PER_QUESTION = 20;
const BASE_URL = "http://localhost:8000";

const initialState = {
  questions: [],
  numParticipatedQuestions: 50,
  participatedQuestions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      // eslint-disable-next-line no-case-declarations
      const numParticipatedQuestions = Math.round(action.payload.length / 3);

      return {
        ...state,
        questions: action.payload,
        numParticipatedQuestions,
        participatedQuestions: getRandomQuestions(
          action.payload,
          numParticipatedQuestions
        ),
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataUpdated":
      return {
        ...state,
        numParticipatedQuestions: action.payload,
        participatedQuestions: getRandomQuestions(
          state.questions,
          action.payload
        ),
      };
    case "start":
      return {
        ...state,
        secondsRemaining:
          state.participatedQuestions.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        numParticipatedQuestions: state.numParticipatedQuestions,
        participatedQuestions: getRandomQuestions(
          state.questions,
          state.numParticipatedQuestions
        ),
        highScore: state.highScore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      return new Error("Unknown Action Type");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      numParticipatedQuestions,
      participatedQuestions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = participatedQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch(`${BASE_URL}/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions: participatedQuestions,
        numParticipatedQuestions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz Context was access outside of Quiz Provider.");
  return context;
}

export { QuizProvider, useQuiz };
