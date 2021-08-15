import React, { Component } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import Spinner from "../Spinner/spinner";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Foods from "../Foods/Foods";
import Profile from "..//Profile/Profile";
import Header from "../Header/Header";
import Cart from "../Cart/cart"
class Home extends Component {
  state = {
    login: false,
    loading: true,
    name: "",
  };
  componentDidMount() {
    axios
      .get("http://localhost:2020/main", {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ login: true, loading: false, name: res.data.name });
      })
      .catch((res) => {
        this.setState({ login: false, loading: false });
      });
  }
  render() {
    let display;
    let load = this.state.loading;
    if (!this.state.login) {
      display = (
        <div>
          <Nav />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <h2>Welcome to Eat Fit!</h2>
            </div>
          </div>
        </div>
      );
    } else {
      display = (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <div>
                  <Header name={this.state.name} />
                  <Foods />
                </div>
              )}
            />
            <Route
              exact
              path="/profile"
              render={(props) => (
                <div>
                  <Profile isLogin={this.state.login} name={this.state.name} />
                </div>
              )}
            />
             <Route
              exact
              path="/cart"
              render={(props) => (
                <div>
                  <Cart isLogin={this.state.login} name={this.state.name} />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      );
    }
    return (
      <React.Fragment>
        {display}
        {load ? <Spinner /> : ""}
      </React.Fragment>
    );
  }
}
export default Home;
