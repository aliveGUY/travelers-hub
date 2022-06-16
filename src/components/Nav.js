import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './Logo.png';

export default function Navbar() {
  const links = [
    {
      id: 1,
      path: '/rockets',
      text: 'Rockets',
    },
    {
      id: 2,
      path: '/',
      text: 'Missions',
    },
    {
      id: 3,
      path: '/myprofile',
      text: 'My Profile',
    },
  ];
  return (
    <nav className="Navbar mt-3">
      <div className="navbar-Logo">
        <img className="navbar-img" src={logo} alt="Logo" />
        <h1 className="mx-3">Space Travelers&apos; Hub</h1>
      </div>
      <ul className="navbar">
        {links.map((link) => (
          <li className="navbar-li" key={link.id}>
            <NavLink to={link.path} className="nav-link">
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
