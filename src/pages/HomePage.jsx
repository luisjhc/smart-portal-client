import "./pagesCss/HomePage.css";

function HomePage() {
  return (
    <div className="wrapper">
      <video autoPlay loop muted>
        <source
          src="https://res.cloudinary.com/dertdncse/video/upload/v1623507603/smart%20portal/videos/london_edited_s7bg9n.mp4"
          type="video/mp4"
        />
      </video>
      <p>SMART PORTAL</p>
    </div>
  );
}

export default HomePage;
