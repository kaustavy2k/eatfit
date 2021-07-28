import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const header = (props) => {
  //console.log(props.name,"header")
  return (
    <header className="Header">
      <h3>Hi {props.name}!</h3>
      <div className="headerOp">
        <Link className="item" to="/">
          Booking
        </Link>
        <Link className="item" to="/profile">
          Profile
        </Link>
      </div>
    </header>
  );
};
export default header;
