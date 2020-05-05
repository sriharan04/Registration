import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  const handleclick = (e) => {
    if (props.disable) {
      e.preventDefault();
    }
  };
  return (
    <div className={classes.main_head}>
      <ul className={classes.main_head_ul}>
        <li>
          <NavLink
            onClick={(e) => handleclick(e)}
            to="/persondetails"
            className={classes.round}
          >
            1
          </NavLink>
          <p className={classes.nav}>Personal Details</p>
        </li>
        <li>
          <NavLink
            onClick={(e) => handleclick(e)}
            to="/companydetails"
            className={classes.round}
          >
            2
          </NavLink>
          <p className={classes.nav}>Company Details</p>
        </li>
        <li>
          <NavLink
            onClick={(e) => handleclick(e)}
            to="/emailverification"
            className={classes.round}
          >
            3
          </NavLink>
          <p className={classes.nav}>Email Verfificaton</p>
        </li>
      </ul>
    </div>
  );
};

export default Header;
