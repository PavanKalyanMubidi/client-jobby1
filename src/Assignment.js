import React, { useState } from "react";
// import logo from "../src/img/_94715d91-9ccb-448a-a29a-a52b3610949f.jpeg";
import "./App.css"; // You can create an App.css file for styling
import { FaBars } from "react-icons/fa"; // Import the hamburger icon from react-icons
import { Link } from "react-router-dom";

function Assessment() {
  const [navItemsVisible, setNavItemsVisible] = useState(false);

  const toggleNavItems = () => {
    setNavItemsVisible(!navItemsVisible);
  };

  return (
    <div className="d-flex flex-row">
      <div className="container">
        <div className={`nav-bar ${!navItemsVisible ? "hidden" : ""}`}>
          <div className="toggle-button" onClick={toggleNavItems}>
            {/* <img src={logo} className="image1" /> */}
            <FaBars />
          </div>
          {navItemsVisible && (
            <ul className="nav-list">
                
              <li className="list">
                <a href="/">Dash Board</a>
              </li>
              <li className="list">
                <a href="/about">Home page</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="assessment">
        <div className="d-flex flex-row">
          <h2>Assessment List</h2>
          <button  className="uma">
            +Create Assessment
          </button>
        </div>
        <div className="d-flex flex-row">
          <p>Show</p>
          <select>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
          <label>Seach</label>
          <input />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>EXAM ID</th>
              <th>EXAM SERIES</th>
              <th>EXAM NAME </th>
              <th>PASSWORD</th>
              <th>QUES SELECTION</th>
              <th>DISPLAY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assessment;