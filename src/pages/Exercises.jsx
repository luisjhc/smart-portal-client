import QuizExercise from "../components/Exercises/QuizExercise";
import * as PATHS from "../utils/paths";
import ProtectedRoute from "../routing-components/ProtectedRoute";
import AudioExercise from "../components/Exercises/AudioExercise";

function Exercises(props) {
  //console.log("props:", props);
  const { authenticate, user } = props;

  return (
    <div className="app">
      <ProtectedRoute
        exact
        path={PATHS.EXERCISES}
        authenticate={authenticate}
        component={QuizExercise}
        user={user}
      />
      <ProtectedRoute
        exact
        path={PATHS.EXERCISES}
        authenticate={authenticate}
        component={AudioExercise}
        user={user}
      />
    </div>
  );
}

export default Exercises;
