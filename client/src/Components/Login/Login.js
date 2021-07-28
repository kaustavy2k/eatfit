import React, { Component } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import Spinner from "../Spinner/spinner";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;
class SignUp extends Component {
  state = {
    error: false,
    loading: false,
    msg: "",
  };
  submitHandler = (e) => {
    this.setState({
      error: false,
      loading: true,
    });
    e.preventDefault();
    const data = {
      email: this.email,
      password: this.password,
    };
    axios
      .post("http://localhost:2020/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          loading: false,
        });
        this.props.history.replace("/");
      })
      .catch((err) => {
        let e = err.response.data.message;
        this.setState({
          error: true,
          loading: false,
          msg: e,
        });
      });
  };
  render() {
    let popup;
    if (this.state.error) {
      popup = <h5 className="display-error">{this.state.msg}</h5>;
    }
    let load = this.state.loading;
    return (
      <React.Fragment>
        <Nav />

        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.submitHandler}>
              <h3>Login</h3>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => (this.email = e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => (this.password = e.target.value)}
                />
                {popup}
              </div>
              <button className="btn btn-primary btn-block">Login</button>
            </form>
            <Link to={"/forgot"} className="nav-link">
              Forgot Password
            </Link>
          </div>
          {load ? <Spinner /> : ""}
        </div>
      </React.Fragment>
    );
  }
}
export default SignUp;
