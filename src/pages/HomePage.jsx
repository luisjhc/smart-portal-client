import "./pagesCss/HomePage.css";

function HomePage() {
  return (
    <div className="wrapper">
      <video autoPlay loop muted>
        <source
          src="https://res.cloudinary.com/dgmm3pkuc/video/upload/v1623777768/react-smart-portal/British_Flag_Waving_HD_ie8lyx.mp4"
          type="video/mp4"
        />
      </video>
      <p>SMART PORTAL</p>
    </div>
  );
}

export default HomePage;
