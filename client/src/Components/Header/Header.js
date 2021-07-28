import React from "react";
import { connect } from "react-redux";
import "./Header.css";
import { Link } from "react-router-dom";
const header = (props) => {
  //console.log(props.name,"header")
  return (
    <header className="Header">
      <h3>Hi {props.name}!</h3>
      <div className="headerOp">
        <Link className="item" to="/">
          Food
        </Link>
        <Link className="item" to="/cart">
          Cart
          <span className="closediv">
            {props.count}
          </span>
        </Link>
        <Link className="item" to="/profile">
          Profile
        </Link>
      </div>
    </header>
  );
};

const mapstatetoprops = (state) => {
  return {
    count: state.count,
  };
};
export default connect(mapstatetoprops, null)(header);
