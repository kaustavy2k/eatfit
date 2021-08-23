import React, { Component } from "react";
import axios from "axios";
import "./Signup.css";
import Spinner from "../Spinner/spinner";
import Nav from "../Nav/Nav"
axios.defaults.withCredentials = true;
class SignUp extends Component {
  state = {
    error: false,
    loading: false,
    msg: {},
  };
  // logoutHandler=()=>{
  //   axios
  //   .get("http://localhost:2020/logout", {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //   })
  // }
  submitHandler = (e) => {
    this.setState({
      error: false,
      loading: true,
    });
    e.preventDefault();
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirm: this.cpassword,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, data, {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res);
        this.setState({
          loading: false,
        });
        this.props.history.replace("/");
      })
      .catch((err) => {
        let e = err.response.data.message.errors;

        let temp = { name: "", email: "", password: "", passwordConfirm: "" };
        let keys = Object.keys(e);

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] in temp) {
            temp[keys[i]] = e[keys[i]].message;
          }
        }
        this.setState({
          error: true,
          loading: false,
          msg: { ...temp },
        });
      });
      // axios
      // .get("http://localhost:2020/",{
      //   headers:{
      //     "Authorization": "Bearer "+token
      //   }
      // })
  };
  render() {
    let popup1, popup2, popup3, popup4;
    if (this.state.error) {
      popup1 = <h5 className="display-error">{this.state.msg.name}</h5>;
      popup2 = <h5 className="display-error">{this.state.msg.email}</h5>;
      popup3 = <h5 className="display-error">{this.state.msg.password}</h5>;
      popup4 = (
        <h5 className="display-error">{this.state.msg.passwordConfirm}</h5>
      );
    }
    let load = this.state.loading;
    return (
      <React.Fragment>
        <Nav/>
      
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.submitHandler}>
            <h3>Sign Up</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => (this.name = e.target.value)}
              />
              {popup1}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                onChange={(e) => (this.email = e.target.value)}
              />
              {popup2}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => (this.password = e.target.value)}
              />
              {popup3}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                onChange={(e) => (this.cpassword = e.target.value)}
              />
              {popup4}
            </div>
            <button className="btn btn-primary btn-block">Sign Up</button>
            
          </form>
          
        </div>
        {load ? <Spinner /> : ""}
      </div>
      </React.Fragment>
    );
  }
}
export default SignUp;
