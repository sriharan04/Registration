import React, { Component } from "react";
import classes from "./Success.module.css";
import Btn from "../../components/Button/Button";
class Success extends Component {
  goback = () => {
    window.open("about:blank", "_self");
    window.close();
  };
  render() {
    return (
      <div className={classes.form_structure}>
        <div className={classes.form}>
          <div className={classes.spam}>
            <h1>Successfully Registered</h1>
            <p>
              Your account has been created. Now you can login to your account.
            </p>
            <div className={classes.btn_container_cmpny}>
              <button
                className={classes.back}
                onClick={(event) => this.goback(event)}
              >
                close
              </button>
              <Btn disabled={false} onClick={(event) => this.goback(event)}>
                Login
              </Btn>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
