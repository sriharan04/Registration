import React from "react";
import classes from "./Doublebutton.module.css";
import Btn from "../Button/Button";
const Doublebutton = (props) => {
  return (
    <div className={classes.btn_container_cmpny}>
      <button className={classes.back} onClick={props.click}>
        {props.back}
      </button>
      <Btn disabled={props.valid}>{props.content}</Btn>
    </div>
  );
};

export default Doublebutton;
