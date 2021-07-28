import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import Spinner from "../Spinner/spinner";
import Food from "./Food/Food";
import makeAnimated from "react-select/animated";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Foods.css";
const animatedComponents = makeAnimated();
const foods = (props) => {
  const firstUpdate = useRef(true);
  const [load, setload] = useState(true);
  const [food, setfood] = useState([]);
  const [ailment, setailment] = useState([]);
  const [filter, setfilter] = useState({
    ailment: [],
    specific: [],
    other: [],
  });
  const [specific, setspecific] = useState([
    { label: "High Protein", value: "protein", id: 1, positon: 1 },
    { label: "Low Protein", value: "protein", id: 0, positon: 0 },
    { label: "High Carbohydrates", value: "carbohydrates", id: 1, positon: 3 },
    { label: "Low Carbohydrates", value: "carbohydrates", id: 0, positon: 2 },
    { label: "High Fat", value: "fat", id: 1, positon: 5 },
    { label: "Low Fat", value: "fat", id: 0, positon: 4 },
  ]);

  const [other, setother] = useState([
    { label: "I go to GYM", value: "gym" },
    { label: "I'm Pregnant", value: "pregnant" },
    { label: "I have high cholesterol", value: "cholesterol" },
    { label: "I'm diabetic", value: "diabetic" },
  ]);

  useEffect(() => {
    setload(true);
    axios
      .get("http://localhost:2020/get-food-all", {
        withCredentials: true,
      })
      .then((res) => {
        setfood(res.data.food);
        // console.log(res.data);
        return axios.get("http://localhost:2020/get-ailment-all", {
          withCredentials: true,
        });
      })
      .then((res) => {
        let ailment = [];
        res.data.ailment.forEach((i) => {
          ailment.push({ value: i.name, label: i.name, id: i._id });
        });
        setailment(ailment);
        setload(false);
        // console.log(ailment);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setload(true);
    axios
      .post(
        "http://localhost:2020/get-food-filter",
        { filter },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setfood(res.data.food);
        setload(false);
        // console.log(res.data);
      });
  }, [filter]);

  let ailmentSelector = (data) => {
    // console.log(data);
    let ailmentId = data.map((i) => {
      return i.id;
    });
    setfilter({ ...filter, ailment: ailmentId });
  };

  let specificSelector = (data) => {
    // console.log(data);
    let set = [...specific];
    data.forEach((i) => {
      set[i.positon].disabled = "true";
    });
    setspecific([...set]);
    setfilter({ ...filter, specific: data });
  };

  let otherSelector = (data) => {
    let otherId = data.map((i) => {
      return i.value;
    });
    setfilter({ ...filter, other: otherId });
  };

  return (
    <React.Fragment>
      {load ? <Spinner /> : ""}
      <div className="filter">
        <div style={{ width: "100%" }}>
          <Select
            placeholder="Filter by Ailment"
            closeMenuOnSelect={false}
            components={animatedComponents}
            //defaultValue={[...this.props.state.selectedCat]}
            isMulti
            options={ailment}
            onChange={ailmentSelector}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Select
            placeholder="Filter by Content"
            closeMenuOnSelect={false}
            components={animatedComponents}
            //defaultValue={[...this.props.state.selectedCat]}
            isMulti
            options={specific}
            onChange={specificSelector}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Select
            placeholder="Other filters"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={other}
            onChange={otherSelector}
          />
        </div>
        <button className="btn btn-danger">CLEAR</button>
      </div>
      <div className="row m-0">
        {food.length ? (
          food.map((item, ind) => {
            return <Food key={ind} info={item} />;
          })
        ) : (
          <div className="auth-wrapper">
            <div className="auth-inner">
              <h2>Sorry no Food found!</h2>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default foods;
