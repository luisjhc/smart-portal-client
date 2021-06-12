import React, { useState } from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import ReactPlayer from "react-player";

function AudioExercise(props) {
  //console.log("props:", props);
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
        setExercises(response.data);
        //console.log("exercises:", exercises);
      })
      .catch((err) => {
        console.log("err:", err.response);
      });
  }, [props.match.params.exercise]);

  // React.useEffect(() => {
  //   console.log("exercises:", exercises);
  // }, [exercises]);

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
    if (nextQuestion < exercises.audioQuiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  //console.log("response:", exercises);

  return (
    <div className="app">
      {!exercises.audioQuiz ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>LISTENING QUIZ</h1>
          {/* {console.log(exercises.audioSource.includes("mp3"))} */}
          {exercises.audioSource.includes("mp3") ? (
            <ReactPlayer url={exercises.audioSource} height="50px" controls />
          ) : (
            <ReactPlayer url={exercises.audioSource} controls />
          )}
          {showScore ? (
            <div className="score-section">
              <div>
                You scored {score} out of {exercises.audioQuiz.length}
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
                  {exercises.audioQuiz.length}
                </div>
                <div className="question-text">
                  {exercises.audioQuiz[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {exercises.audioQuiz[currentQuestion]?.answerOptions.map(
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
      )}
    </div>
  );
}

export default AudioExercise;
