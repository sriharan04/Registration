import React from "react";
import ReactPhoneInput from "react-phone-input-2";
import classes from "./Input.module.css";
import "react-phone-input-2/lib/style.css";
import Upload from "../Upload/Upload";
const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          style={props.style}
        />
      );
      break;
    case "phone":
      inputElement = (
        <ReactPhoneInput
          country={"in"}
          value={props.value}
          onChange={props.changed}
          inputStyle={{ width: "110%", height: "3rem" }}
          containerStyle={{ width: "90%", height: "3rem" }}
          isValid={(value, country) => {
            if (props.touched) {
              if (/^\d{12}$/.test(value)) return true;
              else return false;
            } else {
              return true;
            }
          }}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "upload":
      inputElement = <Upload upload_evt={props.changed} logo={props.value} />;
      break;
    case "checkbox":
      inputElement = (
        <div className={classes.check}>
          <input
            type="checkbox"
            className={classes.checkbox}
            onChange={props.changed}
            value={props.value}
            checked={props.value}
          ></input>
          <p className={classes.terms}>
            I accepts the <a href="!#">Terms and Conditions</a>
          </p>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <div>
        <label className={classes.Label}>{props.label}</label>
      </div>
      {inputElement}
    </div>
  );
};

export default input;
