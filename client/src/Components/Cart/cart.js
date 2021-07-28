import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../Spinner/spinner";
import Header from "../Header/Header";
import "./cart.css";
let total = 0;
class Cart extends Component {
  state = {
    login: false,
    loading: true,
    name: this.props.name,
    msg: {},
    bookings: [],
    bookedmsg: "",
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("http://localhost:2020/main", { withCredentials: true })
      .then((res) => {
        this.setState({ login: true, loading: false, name: res.data.name });
      })
      .catch((res) => {
        this.setState({ login: false, loading: false });
      });
  }
  getitems = () => {
    let final = [];
    total = 0;
    for (let i in this.props.items) {
      if (this.props.items[i] !== 0) {
        total += this.props.cost[i];
        //console.log(total,this.props.cost)
        final.push({
          item: i,
          cost: this.props.cost[i] / this.props.items[i],
          quantity: this.props.items[i],
        });
      }
    }
    return final;
  };
  render() {
    let load = this.state.loading;
    return (
      <React.Fragment>
        {load ? <Spinner /> : ""}
        <Header name={this.state.name} />
        <div className="container profile-container">
          <div className="card">
            <h5 className="card-header">Your Orders</h5>
            <div className="card-body itemwrapper">
              {this.props.count == 0 ? "Place some orders to view here" : ""}
              <div className="items">
                {this.getitems().map((i, ind) => {
                  return (
                    <div key={ind}>
                      {i.item}- {i.quantity} X {i.cost}
                    </div>
                  );
                })}
              </div>
              <div className="cost">
                {this.getitems().map((i, ind) => {
                  return <div key={ind}>{i.quantity * i.cost}</div>;
                })}
                <div>{total == 0 ? "" : "TOTAL=" + total}</div>
              </div>
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
        </div>
      </React.Fragment>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    count: state.count,
    items: state.items,
    cost: state.cost,
  };
};
export default connect(mapstatetoprops, null)(Cart);
