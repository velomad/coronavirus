import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="App">
      <ul className="nav justify-content-center grey lighten-5 py-4">
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
      </ul>
    </div>
  );
}

export default NavBar;
