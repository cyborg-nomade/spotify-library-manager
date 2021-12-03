import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./ArtistsListItem.module.css";

const ArtistsListItem = (props) => {
  return (
    <Card className={classes["artist-item"]}>
      <div>
        <img src={props.image} alt="artist" />
      </div>
      <div className={classes["artist-item__description"]}>
        <a href={props.uri}>
          <h2>{props.name}</h2>
        </a>
        <h2> {props.followers} </h2>
        <h2> {props.genres[0]} </h2>
        <h2> {props.popularity} </h2>
        <Button>Show Details</Button>
      </div>
    </Card>
  );
};

export default ArtistsListItem;
