import React from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./ArtistsListItem.module.css";

const ArtistsListItem = (props) => {
  return (
    <Card className={classes["artist-item"]}>
      <img src={props.image} alt="artist" />
      <a href={props.uri}>
        <h2>{props.name}</h2>
      </a>
      <Button onClick={props.onShowDetails}>Show Details</Button>
    </Card>
  );
};

export default ArtistsListItem;
