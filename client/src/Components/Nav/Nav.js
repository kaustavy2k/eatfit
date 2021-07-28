import React, { Component } from "react";
import {Link} from "react-router-dom"
class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link href="" className="navbar-brand" to={"/"}>
            Home
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;
