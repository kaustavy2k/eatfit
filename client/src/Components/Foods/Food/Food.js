import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const food = (props) => {
  //console.log(props.count,props.cost, props.items);
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 ">
      <div className="boxDiv">
        <div className="imgCard" />
        <div className="card-body">
          <h5 className="card-title">{props.info.name}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Calories(mg)- {props.info.calories} , Protein(mg)-{" "}
              {props.info.protein}
            </li>
            <li className="list-group-item">
              Carbohydrates(mg)- {props.info.carbohydrates} , Fat(mg)-
              {props.info.fat}
            </li>
            <li className="list-group-item">Cost- Rs {props.info.cost}</li>
            <li className="list-group-item">
              Quantity-{" "}
              {props.items[props.info.name] ? props.items[props.info.name] : 0}
            </li>
          </ul>
          <div className="buttons">
            <button
              disabled={!props.items[props.info.name]}
              onClick={props.decrement.bind(
                null,
                props.info.name,
                props.info.cost
              )}
              className="btn btn-danger"
            >
              -
            </button>
            <button
              disabled={props.items[props.info.name] > 0}
              onClick={props.increment.bind(
                null,
                props.info.name,
                props.info.cost
              )}
            >
              {props.items[props.info.name] > 0 ? (
                <Link className="btn btn-primary" to="/cart">
                  GO TO CART
                </Link>
              ) : (
                <div className="btn btn-primary">ADD TO CART</div>
              )}
            </button>
            <button
              disabled={!props.items[props.info.name]}
              onClick={props.increment.bind(
                null,
                props.info.name,
                props.info.cost
              )}
              className="btn btn-danger"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapstatetoprops = (state) => {
  return {
    count: state.count,
    items: state.items,
    cost: state.cost,
  };
};
const mapdispatchtoprops = (dispatch) => {
  return {
    increment: (name, cost) => dispatch({ type: "INCREMENT", name, cost }),
    decrement: (name, cost) => dispatch({ type: "DECREMENT", name, cost }),
  };
};
export default connect(mapstatetoprops, mapdispatchtoprops)(food);
