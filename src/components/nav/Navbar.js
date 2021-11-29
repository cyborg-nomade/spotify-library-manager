import React from "react";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes["navbar-right"]}>
        <label htmlFor="search-bar">Search</label>
        <input type="search" name="" id="search-bar" />
        <button type="submit">OK</button>
      </div>
    </nav>
  );
};

export default Navbar;
