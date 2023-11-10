import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Hero = () => {
  const history = useHistory();
  return (
    <div className="hero">
      <h1>Plan Smarter with</h1>
      <h3>LandScAIpe</h3>
      <div className="hero-descriptor">
        <p>
          LandScAIpe is a web application that allows users to plan their
          landscaping projects with ease. Developed as a project for CSC 480.
        </p>
      </div>

      <button className="start-btn" onClick={() => history.push("/plan")}>
        <AutoAwesomeIcon />
        <p>Get Started</p>
      </button>

      <img src="maps-demo.png" alt="" width="950px" />
    </div>
  );
};

export default Hero;
