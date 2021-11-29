import Card from "../UI/Card";
import "./ArtistsListItem.css";
import React from "react";
import Button from "../UI/Button";

const ArtistsListItem = (props) => {
  return (
    <Card className="artist-item">
      <div>
        <img src={props.image} alt="artist" />
      </div>
      <div className="artist-item__description">
        <a href={props.uri}>
          <h2>{props.name}</h2>
        </a>
        <h2> {props.followers} </h2>
        <h2> {props.genres[0]} </h2>
        <h2> {props.popularity[0]} </h2>
        <Button>Show Details</Button>
      </div>
    </Card>
  );
};

export default ArtistsListItem;
