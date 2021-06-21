import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { ReactComponent as Beginner } from "../../Ilustrations/beginner.svg";
import { ReactComponent as Intermediate } from "../../Ilustrations/intermediate.svg";
import { ReactComponent as Advanced } from "../../Ilustrations/advanced.svg";
import "./teacherCss/Content.css";
import { motion } from "framer-motion";

function Content() {
  return (
    <div className="content-container">
      <motion.div
        initial={{ x: "-10vw", y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="content-beginner"
      >
        <Link to={PATHS.CONTENT_BEGINNER}>BEGINNER CONTENT</Link>
        <Beginner />
      </motion.div>
      <motion.div
        initial={{ x: "-10vw", y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="content-intermediate"
      >
        <Link to={PATHS.CONTENT_INTERMEDIATE}>INTERMEDIATE CONTENT</Link>
        <Intermediate />
      </motion.div>
      <motion.div
        initial={{ x: "-10vw", y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="content-advanced"
      >
        <Link to={PATHS.CONTENT_ADVANCED}>ADVANCED CONTENT</Link>
        <Advanced />
      </motion.div>
    </div>
  );
}

export default Content;
