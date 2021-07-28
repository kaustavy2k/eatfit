import React, { Component } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import Spinner from "../Spinner/spinner";
import Header from "../Header/Header";
import UserProfile from "./Userprofile";
class Profile extends Component {
  state = {
    login: false,
    loading: true,
    name: this.props.name,
  };
  componentDidMount() {
    if (!this.props.isLogin) {
      axios
        .get("http://localhost:2020/main", { withCredentials: true })
        .then((res) => {
          this.setState({ login: true, loading: false, name: res.data.name });
        })
        .catch((res) => {
          this.setState({ login: false, loading: false });
        });
    }
  }
  setname = (n) => {
    this.setState({ name: n });
  };
  render() {
    let display, load;
    if (this.props.isLogin) {
      display = (
                <div>
                  <Header name={this.state.name} />
                  <UserProfile name={(e)=>{this.setname(e)}}/>
                </div>
      );
    } else {
      load = this.state.loading;
      if (!this.state.login) {
        display = (
          <div>
            <Nav />
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h2>Welcome to Car rentals!</h2>
              </div>
            </div>
          </div>
        );
      } else {
        display = (
                  <div>
                    <Header name={this.state.name} />
                    <UserProfile name={(e)=>{this.setname(e)}}/>
                  </div>
        );
      }
    }
    return (
      <React.Fragment>
        {display}
        {load ? <Spinner /> : ""}
      </React.Fragment>
    );
  }
}
export default Profile;
