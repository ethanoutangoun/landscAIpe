import "./App.css";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Map from "./Map";

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

          <Route path="/plan">
            <Map />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
