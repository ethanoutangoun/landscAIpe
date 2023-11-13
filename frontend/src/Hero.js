import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";


const Hero = () => {
  const history = useHistory();
  return (
    <div className="hero">
      <h1>Plan Smarter with</h1>
      <div className="title-sec">
        <h3>LandSc</h3>
        <h3 className="gradient-ai">AI</h3> 
        
        <h3>pe</h3>
      </div>
      
      <div className="hero-descriptor">
        <p>
          LandScAIpe is a web application that allows users to plan their
          landscaping projects with ease. Developed as a project at Cal Poly for CSC 480.
        </p>
      </div>

      <button className="start-btn" onClick={() => history.push("/plan")}>
        <AutoAwesomeIcon />
        <p>Get Started</p>
      </button>

      <img src="demo.png" alt="" width="950px" />
    </div>
  );
};

export default Hero;
