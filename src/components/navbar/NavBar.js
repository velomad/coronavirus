import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { connect } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeActions';

const NavBar = (props) => {
  const [mode, setMode] = useState(false)
  //  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false)

  const handleDarkMode = () => {
    setMode(!mode)
    props.setMode(mode)
  }

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
          onClick={handleDarkMode}
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
    setMode: (mode) => dispatch(darkModeAction(mode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
