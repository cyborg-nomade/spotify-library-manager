import React from "react";

import classes from "./MainHeader.module.css";
import Navbar from "./Navbar";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <Navbar />
    </header>
  );
};

export default MainHeader;
