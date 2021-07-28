import React, { Component } from "react";
class Error extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h2>Invalid Route. Please Login to continue!</h2>
        </div>
      </div>
    );
  }
}
export default Error;