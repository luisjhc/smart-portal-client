import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
// import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  const { user } = props;

  return (
    <nav className="nav-container">
      {props.user ? (
        <>
          <div className="nav-userGreeting">
            <img
              src={user.profilePic}
              className="nav-userGreeting-img"
              alt={`Greeting pic for ${user.username}`}
            />
            <h3>Welcome {user.username}</h3>
          </div>
          <div className="nav__authLinks">
            <Link to={PATHS.MYPORTAL} className="nav-authLink">
              &#127891; My Portal
            </Link>
            <Link to={PATHS.MYPROFILE} className="nav-authLink">
              My Profile
            </Link>
          </div>
          <div className="nav-logOut">
            <button className="nav-logout-btn" onClick={props.handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to={PATHS.SIGNUPPAGE} className="nav-authLink">
            Signup
          </Link>
          <Link to={PATHS.LOGINPAGE} className="nav-authLink">
            Log In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
