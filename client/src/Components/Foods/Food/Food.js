import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const food = (props) => {
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
          </ul>
        </div>
      </div>
    </div>
  );
};
export default food;
