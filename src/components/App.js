import React, { useEffect } from "react";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home/Home';
import Demographics from './demographics/Demographics';
import DeepDive from './deep-dive/DeepDive';
import '../index.css'
import { connect } from 'react-redux';
import StateInfo from "./home/StateInfo";



function App(props) {


  return (
    <div className={`App ${props.modeState && 'dark-body'}`} >
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/demographics" component={Demographics} />
        <Route path="/deep-dive" component={DeepDive} />
        <Route path="/state/:statename" component={StateInfo} />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modeState: state.darkMode.hasmode
  }
}

export default connect(mapStateToProps)(App);
