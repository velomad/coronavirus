import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeActions';
import * as Icon from 'react-feather';
import NotificationCenter from './NotificationCenter';

const getInitialMode = () => {
  const saevdMode = JSON.parse(localStorage.getItem('dark-mode'))
  return saevdMode || false
}

const NavBar = (props) => {
  const [mode, setMode] = useState(getInitialMode())
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    props.setModeProp(mode)
    localStorage.setItem('dark-mode', JSON.stringify(mode))
  }, [mode])

  const handleNotification = () => {
    setNotification(!notification)
  }

  return (
    <div className="App">
      <ul className={`nav justify-content-center ${props.modeState === false ? "grey lighten-4" : 'dark-body'} py-4`}>
        <li
          onClick={() => setMode(!mode)}
          className="dark-mode nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="#">
            {mode === false ?
              <Icon.Moon />
              : <Icon.Sun color={'#ffc107'} />} </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link w3-animate-opacity" to="/">
            Home
          </NavLink>
        </li>
        {/* <li className="nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="/demographics">
            Demographics
          </NavLink>
        </li> */}
        <li className="nav-item w3-animate-opacity">
          <NavLink className="nav-link" to="/deep-dive">
            Visuals
          </NavLink>
        </li>
        <li onClick={handleNotification} className="nav-item dropdown">
          <span style={{ borderRadius: "50px" }} className="nav-link  waves-effect waves-light" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{notification === true ? <Icon.BellOff /> : <Icon.Bell />}</span>
          <div style={{ width: "370px", marginLeft: "0px" }} className={`dropdown-menu dropdown-menu-right dropdown-info ${props.modeState === false ? "bg-info" : 'bg-info'}`} aria-labelledby="navbarDropdownMenuLink">
            <NotificationCenter />
          </div>
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
