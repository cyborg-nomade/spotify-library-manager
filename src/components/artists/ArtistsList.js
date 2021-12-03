import React from "react";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import classes from "./ArtistsList.module.css";
import ErrorModal from "../UI/ErrorModal";

const ArtistsList = (props) => {
  return (
    <div>
      <ErrorModal
        title={props.artists[0].name}
        message={props.artists[0].image}
      />
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
    </div>
  );
};

export default ArtistsList;
