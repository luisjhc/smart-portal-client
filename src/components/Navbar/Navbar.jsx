import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
// import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav>
      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.MYPORTAL} className="nav__projectName">
              My Portal
            </Link>
            {/* <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link> */}
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
