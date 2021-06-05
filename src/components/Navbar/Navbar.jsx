import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
// import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  const { user } = props;

  return (
    <nav>
      <div className="nav__authLinks">
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
            <Link to={PATHS.MYPORTAL} className="nav__projectName">
              &#127891; My Portal
            </Link>
            {/* <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link> */}
            <Link to={PATHS.MYPROFILE}>My Profile</Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
