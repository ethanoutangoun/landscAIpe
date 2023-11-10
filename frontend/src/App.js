import "./App.css";
import Hero from "./Hero";
import Map from "./Map";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Hero />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
