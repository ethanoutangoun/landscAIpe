import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Navbar = () => {

  const history = useHistory();

  return (
    <div className="navbar">
      <div className="navbar-col" >
        <img id="icon-header" src="favicon.ico" alt="nav-icon" width="30px" onClick={()=>history.push('/')} />
        <h1 id="icon-header" onClick={()=>history.push('/')}>LandScAIpe</h1>
      </div>
      <div className="navbar-colw">
        
      </div>
      <div className="navbar-col">
        <p id="auth-buttons" onClick={()=>history.push('/about')}>About</p>
        <p id="auth-buttons" onClick={()=>history.push('/contact')}>Contact Us</p>
      </div>
    </div>
  );
};

export default Navbar;
