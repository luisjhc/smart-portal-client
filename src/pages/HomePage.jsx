import "./pagesCss/HomePage.css";

function HomePage() {
  return (
    <div className="main">
      <p data-text="Welcome to...">Welcome to...</p>
      <div className="wrapper">
        <video autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/dgmm3pkuc/video/upload/v1623777768/react-smart-portal/British_Flag_Waving_HD_ie8lyx.mp4"
            type="video/mp4"
          />
        </video>
        <h1>SMART PORTAL</h1>
      </div>
    </div>
  );
}

export default HomePage;
