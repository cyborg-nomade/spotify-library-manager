import React from "react";
import Button from "../UI/Button";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes["navbar-right"]}>
        <label htmlFor="search-bar">Search</label>
        <input
          type="search"
          name=""
          id="search-bar"
          onChange={props.onSearchTermChanged}
        />
        <Button type="submit">OK</Button>
      </div>
    </nav>
  );
};

export default Navbar;
