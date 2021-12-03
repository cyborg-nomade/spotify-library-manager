import React from "react";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import classes from "./ArtistsList.module.css";

const ArtistsList = (props) => {
  return (
    <Card className={classes.artists}>
      {props.artists.map((artist) => (
        <ArtistsListItem
          image={artist.image}
          name={artist.name}
          uri={artist.uri}
          followers={artist.followers}
          genres={artist.genres}
          popularity={artist.popularity}
        />
      ))}
    </Card>
  );
};

export default ArtistsList;
