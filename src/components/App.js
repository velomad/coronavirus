import React from "react";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home/Home';
import Demographics from './demographics/Demographics';
import DeepDive from './deep-dive/DeepDive';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/demographics" component={Demographics} />
        <Route path="/deep-dive" component={DeepDive} />
      </BrowserRouter>
    </div>
  );
}

export default App;
