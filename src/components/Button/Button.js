import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={classes.btn_container}>
      <button disabled={props.disabled} className={classes.btn}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
