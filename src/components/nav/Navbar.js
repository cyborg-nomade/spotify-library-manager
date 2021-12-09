import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
import SearchContext from "./../../store/search-context";

import Button from "../UI/Button";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const searchContext = useContext(SearchContext);

  return (
    <nav className={`${classes.navbar} ${classes.nav}`}>
      <ul>
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Artists</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Albums</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Songs</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Playlist</a>
          </li>
        )}
      </ul>
      <ul className={classes["navbar-right"]}>
        {authContext.isLoggedIn && (
          <li>
            <label htmlFor="search-bar"> Search:</label>
            <input
              type="search"
              id="search-bar"
              onChange={searchContext.onSearchTermChanged}
            />
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <Button onClick={authContext.onLogout}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
