import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="navbar-col">
        <img
          id="icon-header"
          src="favicon.ico"
          alt="nav-icon"
          width="30px"
          onClick={() => history.push("/")}
        />
        <div id="icon-header" onClick={() => history.push("/")}>
          <h1>LandSc</h1>
          <h1 className="gradient-ai">AI</h1>
          <h1>pe</h1>
        </div>
      </div>

      <div className="navbar-col">
        <p id="auth-buttons" onClick={() => history.push("/about")}>
          Learn More
        </p>
      
        <img
          id="auth-buttons"
          src="github-icon.png"
          alt="github-icon"
          width="30px"
          onClick={()=> window.open("https://github.com/ethanoutangoun/landscAIpe")}
        />
      </div>
    </div>
  );
};

export default Navbar;
