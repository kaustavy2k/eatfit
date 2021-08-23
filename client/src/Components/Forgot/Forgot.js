import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import Spinner from "../Spinner/spinner";
axios.defaults.withCredentials = true;
class SignUp extends Component {
  state = {
    error: false,
    loading: false,
    msg: "",
    reset: false,
    msgreset: {},
  };
  submitresetHandler = (e) => {
    e.preventDefault();
    this.setState({
      error: false,
      loading: true,
      reset: true,
    });

    const data = {
      password: this.newpass,
      passwordConfirm: this.cpass,
    };
    axios
      .patch(`${process.env.REACT_APP_API_URL}/resetPassword/${this.token}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          loading: false,
          reset: true,
        });
        this.props.history.replace("/");
      })
      .catch((err) => {
        let e = err.response.data.message.errors;

        let temp = { token: "", password: "", passwordConfirm: "" };
        let keys = Object.keys(e);

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] in temp) {
            temp[keys[i]] = e[keys[i]].message;
          }
        }
        this.setState({
          error: true,
          loading: false,
          reset: true,
          msgreset: { ...temp },
        });
      });
  };
  submitHandler = (e) => {
    this.setState({
      error: false,
      loading: true,
    });
    e.preventDefault();
    const data = {
      email: this.email,
    };
    this.cemail.value = "";
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgotPassword`, data, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          loading: false,
          reset: true,
        });
        alert("Reset token sent to registered email");
      })
      .catch((err) => {
        let e = err.response.data.message;
        this.setState({
          error: true,
          loading: false,
          reset: false,
          msg: "",
        });
      });
  };
  render() {
    let display;

    if (this.state.reset) {
      let popup1, popup2, popup3;
      if (this.state.error) {
        popup1 = (
          <h5 className="display-error">{this.state.msgreset.password}</h5>
        );
        popup2 = <h5 className="display-error">{this.state.msgreset.token}</h5>;
        popup3 = (
          <h5 className="display-error">
            {this.state.msgreset.passwordConfirm}
          </h5>
        );
      }
      let load = this.state.loading;
      display = (
        <React.Fragment>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.submitresetHandler}>
                <h3>Reset</h3>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Password"
                    onChange={(e) => (this.newpass = e.target.value)}
                  />
                  {popup1}
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => (this.cpass = e.target.value)}
                  />
                  {popup3}
                </div>
                <div className="form-group">
                  <label>Enter Token</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Token"
                    onChange={(e) => (this.token = e.target.value)}
                  />
                  {popup2}
                </div>
                <button className="btn btn-primary btn-block">Reset</button>
              </form>
            </div>
            {load ? <Spinner /> : ""}
          </div>
        </React.Fragment>
      );
    } else {
      let popup;
      if (this.state.error) {
        popup = <h5 className="display-error">{this.state.msg}</h5>;
      }
      let load = this.state.loading;
      display = (
        <React.Fragment>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.submitHandler}>
                <h3>Forgot Password</h3>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    ref={(inputEl) => {
                      this.cemail = inputEl;
                    }}
                    onChange={(e) => (this.email = e.target.value)}
                  />
                </div>
                {popup}
                <button className="btn btn-primary btn-block">FORGOT</button>
              </form>
            </div>
            {load ? <Spinner /> : ""}
          </div>
        </React.Fragment>
      );
    }
    return (
      <div>
        <Nav />
        {display}
      </div>
    );
  }
}
export default SignUp;
