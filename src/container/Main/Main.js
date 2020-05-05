import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Main.module.css";
import Header from "../../components/Header/Header";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import EmailVerifiaction from "../EmailVerification/Emailverification";
import Success from "../Success/Success";
class Main extends Component {
  state = {
    headerLinkDisable: true,
  };
  render() {
    return (
      <div className={classes.main}>
        <Header disable={this.state.headerLinkDisable} />
        <Switch>
          <Route path="/persondetails" exact component={PersonalDetails} />
          <Route path="/companydetails" component={CompanyDetails} />
          <Route path="/emailverification" component={EmailVerifiaction} />
          <Route path="/success" component={Success} />
          <Redirect from="/" to="/persondetails" />
        </Switch>
      </div>
    );
  }
}

export default Main;
