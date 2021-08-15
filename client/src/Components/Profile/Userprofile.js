import React, { Component } from "react";
import Modalprofile from "./Modalprofile";
import axios from "axios";
import "./userprofile.css";
import "./Modalprofile.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../Spinner/spinner";
class Userprofile extends Component {
  state = {
    show: false,
    loader: false,
    msg: {},
    orders: [],
    bookedmsg: "",
  };
  logout = () => {
    axios
      .get("http://localhost:2020/logout", { withCredentials: true })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ loader: false });
        alert("Error. Try again later");
      });
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  delete = () => {
    axios
      .delete("http://localhost:2020/deleteMe", { withCredentials: true })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ loader: false });
        alert("Error. Try again later");
      });
  };
  updateme = () => {
    this.firstname.value = "";
    this.secondname.value = "";
    this.setState({ loader: true });
    let data = {
      name: this.newname,
      email: this.newemail,
    };

    axios
      .patch("http://localhost:2020/updateMe", data, { withCredentials: true })
      .then((res) => {
        this.setState({ loader: false });
        alert("Name Successfully Changed!");

        this.props.name(this.newname);
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ loader: false });
        alert("Error. Try again later");
      });
  };
  updatepassword = () => {
    this.setState({ loader: true });
    this.firstinput.value = "";
    this.secondinput.value = "";
    this.thirdinput.value = "";
    let data = {
      passwordCurrent: this.oldpass,
      password: this.newpass,
      passwordConfirm: this.cpass,
    };
    axios
      .patch("http://localhost:2020/updateMyPassword", data, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ loader: false, msg: {} });
        alert("Password Successfully Changed!");
      })
      .catch((err) => {
        let e = err.response.data.message.errors;

        let temp = { email: "", password: "", passwordConfirm: "" };
        let keys = Object.keys(e);

        for (let i = 0; i < keys.length; i++) {
          if (keys[i] in temp) {
            temp[keys[i]] = e[keys[i]].message;
          }
        }
        this.setState({ loader: false, msg: { ...temp } });
      });
  };
  showorder = () => {
    //this.setState({ loader: true });
    axios
      .get("http://localhost:2020/get-order", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.food)
        this.setState({
          loader: false,
          orders: res.data.food,
          bookedmsg: res.data.bookedmsg,
        });
      })
      .catch((err) => {
        console.log(err)

        this.setState({ loader: false });
        alert("Error. Try again later");
      });
  };
  getfood=(food)=>{
    let f=Object.keys(food).map((key,i)=>{
      return ` ${key} ${food[key]},`
    })
    return f
  }
  render() {
    let popup1, popup2, popup3, displaybook;
    if (this.state.msg) {
      popup1 = <h5 className="display-error">{this.state.msg.email}</h5>;
      popup2 = <h5 className="display-error">{this.state.msg.password}</h5>;
      popup3 = (
        <h5 className="display-error">{this.state.msg.passwordConfirm}</h5>
      );
    }
    if (this.state.orders.length === 0) {
      displaybook = <h5>{this.state.bookedmsg}</h5>;
    } else {
      displaybook = (
        <div className="ordersdiv">
          {this.state.orders.map((obj, index) => {
            return (
              <div className="orderitems" key={index}>
                <h3>
                  {index + 1}.  {this.getfood(obj.food)} Total= {obj.price}
                </h3>
              </div>
            );
          })}
        </div>
      )
    }
    let load = this.state.loader;
    return (
      <div className="container profile-container">
        <br></br>
        <div className="card">
          <h5 className="card-header">Show My Orders</h5>
          <div className="card-body">
            {displaybook}
            <button className="btn btn-primary" onClick={this.showorder}>
              Show
            </button>
          </div>
        </div>
        <br></br>
        <div className="card">
          <h5 className="card-header">Change Name and Email</h5>
          <div className="card-body">
            <form>
              <div b="form-group">
                <label>New Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="New Name"
                  ref={(inputEl) => {
                    this.firstname = inputEl;
                  }}
                  onChange={(e) => (this.newname = e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label>New Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="New Email"
                  ref={(inputEl) => {
                    this.secondname = inputEl;
                  }}
                  onChange={(e) => (this.newemail = e.target.value)}
                ></input>
              </div>
            </form>
            <button className="btn btn-primary" onClick={this.updateme}>
              Submit
            </button>
          </div>
        </div>
        <br></br>
        <div className="card">
          <h5 className="card-header">Change Password</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Old Password"
                  ref={(inputEl) => {
                    this.firstinput = inputEl;
                  }}
                  onChange={(e) => (this.oldpass = e.target.value)}
                ></input>
                {popup1}
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="New Password"
                  ref={(inputEl) => {
                    this.secondinput = inputEl;
                  }}
                  onChange={(e) => (this.newpass = e.target.value)}
                ></input>
                {popup2}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Confirm Password"
                  ref={(inputEl) => {
                    this.thirdinput = inputEl;
                  }}
                  onChange={(e) => (this.cpass = e.target.value)}
                ></input>
                {popup3}
              </div>
            </form>

            <button className="btn btn-primary" onClick={this.updatepassword}>
              Submit
            </button>
          </div>
        </div>
        <br></br>
        <div className="deletelogout">
          <button
            href="#"
            className="btn btn-primary delete"
            onClick={this.showModal}
          >
            DELETE ACCOUNT
          </button>
          <button
            href="#"
            className="btn btn-primary delete"
            onClick={this.logout}
          >
            LOGOUT
          </button>
        </div>
        <Modalprofile
          delete={this.delete}
          show={this.state.show}
          handleClose={this.hideModal}
        ></Modalprofile>
        {load ? <Spinner /> : ""}
      </div>
    );
  }
}
export default Userprofile;
