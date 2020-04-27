import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeActions';

const getInitialMode = () => {
  const saevdMode = JSON.parse(localStorage.getItem('dark-mode'))
  return saevdMode || false
}

const NavBar = (props) => {
  const [mode, setMode] = useState(getInitialMode())

useEffect(() => {
    props.setModeProp(mode)
    localStorage.setItem('dark-mode', JSON.stringify(mode))
}, [mode])
  


  return (
    <div className="App">
      <ul className={`nav justify-content-center ${props.modeState === false ? "grey lighten-4" : 'dark-body'} py-4`}>
        <li className="nav-item">
          <NavLink className="nav-link w3-animate-opacity" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="/demographics">
            Demographics
          </NavLink>
        </li>
        <li className="nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="/deep-dive">
            Deep Dive
          </NavLink>
        </li>
        <li
          onClick={() => setMode(!mode)}
          className="dark-mode nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="#">
            {mode === false ?
              <i className="far fa-moon"></i>
              : <i className="far fa-sun"></i>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modeState: state.darkMode.hasmode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setModeProp: (mode) => dispatch(darkModeAction(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
