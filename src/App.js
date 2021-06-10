import React, { useEffect, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import MyPortal from "./pages/MyPortal";
import MyProfile from "./pages/MyProfile";
import Content from "./pages/teacher/Content";
import BeginnerContent from "./pages/teacher/BeginnerContent";
import IntermediateContent from "./pages/teacher/IntermediateContent";
import AdvancedContent from "./pages/teacher/AdvancedContent";
import CreateStudent from "./pages/teacher/CreateStudent";
import ListOfStudents from "./pages/teacher/ListOfStudents";
import SingleClassPage from "./pages/SingleClassPage";
import Exercises from "./pages/Exercises";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
      setIsLoading(false);
      history.push("/");
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      <Switch>
        <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
        <NormalRoute
          exact
          path={PATHS.SIGNUPPAGE}
          authenticate={authenticate}
          component={Signup}
        />
        <NormalRoute
          exact
          path={PATHS.LOGINPAGE}
          authenticate={authenticate}
          component={LogIn}
        />
        <ProtectedRoute
          exact
          path={PATHS.MYPORTAL}
          component={MyPortal}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.MYPROFILE}
          component={MyProfile}
          user={user}
          authenticate={authenticate}
        />
        <ProtectedRoute
          exact
          path={PATHS.CONTENT}
          component={Content}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CONTENT_BEGINNER}
          component={BeginnerContent}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CONTENT_INTERMEDIATE}
          component={IntermediateContent}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CONTENT_ADVANCED}
          component={AdvancedContent}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CREATESTUDENT}
          authenticate={authenticate}
          component={CreateStudent}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.LIST_OF_STUDENTS}
          authenticate={authenticate}
          component={ListOfStudents}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CLASS}
          authenticate={authenticate}
          component={SingleClassPage}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.EXERCISES}
          authenticate={authenticate}
          component={Exercises}
          user={user}
        />
      </Switch>
    </div>
  );
}
