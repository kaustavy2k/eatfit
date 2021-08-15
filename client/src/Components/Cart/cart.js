import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../Spinner/spinner";
import Header from "../Header/Header";
import StripeCheckout from "react-stripe-checkout";
import { Redirect, withRouter } from "react-router-dom";
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
    email: "",
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("http://localhost:2020/main", { withCredentials: true })
      .then((res) => {
        this.setState({
          login: true,
          loading: false,
          name: res.data.name,
          email: res.data.email,
        });
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
  payment = async (token) => {
    let final = this.getitems();
    try {
      this.setState({ loading: true });
      const response = await axios.post("http://localhost:2020/payment", {
        token,
        final,
        total,
      });
      this.setState({ loading: false });
      window.alert("Payment Successful! Food on the way!");
      this.props.reset();
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
      window.alert("Payment failed! Server Error");
    }
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
          <StripeCheckout
            stripeKey="pk_test_51JISvASGTGDeZiN2L6dVpSBtCCkfDMDwuR4WwUyLmDRksGsR2eRIraXliSHHKbtDyAlU89yVuxYmEKGGJOd1mZKk00YlteVhG5"
            token={this.payment}
            name={this.state.name}
            email={this.state.email}
          >
            <button
              style={{ width: "100%" }}
              disabled={!total}
              className="btn btn-danger"
            >
              PAY TOTAL={total}
            </button>
          </StripeCheckout>

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
const mapdispatchtoprops = (dispatch) => {
  return {
    reset: () => dispatch({ type: "RESET" }),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(Cart);
