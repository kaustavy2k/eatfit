import React from "react";
import "./Modalprofile.css"
const Modalprofile = (props) => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <span className="close" onClick={props.handleClose}>
          &times;
        </span>

        <div className="outer">
          <h3 className="modalh2">Do you want to delete your account?</h3>
          <div className="deletion">
            <button
              className="btn btn-primary delete"
              onClick={props.delete}
            >
              YES
            </button>
            <button
              className="btn btn-primary delete"
              onClick={props.handleClose}
            >
              NO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Modalprofile;
