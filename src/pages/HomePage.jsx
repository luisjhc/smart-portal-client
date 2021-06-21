import "./pagesCss/HomePage.css";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <div className="homePage-mainContainer">
      <motion.p
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        Welcome to...
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="homePage-videoWrapper"
      >
        <video autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/dgmm3pkuc/video/upload/v1623777768/react-smart-portal/British_Flag_Waving_HD_ie8lyx.mp4"
            type="video/mp4"
          />
        </video>
        <h1>SMART PORTAL</h1>
      </motion.div>
    </div>
  );
}

export default HomePage;
