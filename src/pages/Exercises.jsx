import React, { useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";

function Exercises(props) {
  const [exercises, setExercises] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  React.useEffect(() => {
    axios
      .get(
        `${CONSTS.SERVER_URL}/myPortal/exercise/${props.match.params.exercise}`,
        {
          headers: {
            authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch((err) => {
        console.log("err:", err.response);
      });
  }, [props.match.params.exercise]);

  React.useEffect(() => {
    console.log("exercises:", exercises);
  }, [exercises]);

  function resetQuiz() {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  }
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < exercises.quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // return null;

  if (!exercises.quiz) {
    return <div>Go Shame Yourself</div>;
  }

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <div>
            You scored {score} out of {exercises.quiz?.length}
          </div>
          <div>
            <button onClick={resetQuiz}>reset</button>
          </div>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/
              {exercises.quiz?.length}
            </div>
            <div className="question-text">
              {exercises.quiz?.[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {exercises.quiz?.[currentQuestion]?.answerOptions?.map?.(
              (answerOption, index) => (
                <button
                  className="buttonQuiz"
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Exercises;
