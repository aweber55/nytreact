import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Articles from "./pages/Articles";
import SavedArticles from "./pages/SavedArticles";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";

const App = () => (
  
    

      <div>
      
      <div className="App">
      <Nav />
      <Jumbotron />
<Router>
  <Switch>
    <Route exact path="/" component={Articles} />
    <Route exact path="/saved" component={SavedArticles} />
    <Route component={NoMatch} />
  </Switch>
</Router>

      </div>
      </div>
      
    );
  


export default App;
