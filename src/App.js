import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import MyPortal from "./pages/MyPortal";
import Content from "./pages/Content";
import CreateStudent from "./pages/CreateStudent";
import ListOfStudents from "./pages/ListOfStudents";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          path={PATHS.CONTENT}
          component={Content}
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
      </Switch>
    </div>
  );
}
