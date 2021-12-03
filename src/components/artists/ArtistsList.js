import React, { useState } from "react";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import classes from "./ArtistsList.module.css";
import Modal from "../UI/Modal";

const ArtistsList = (props) => {
  const [display, setDisplay] = useState();

  const modalDismissHandler = () => {
    setDisplay(null);
  };

  const showDetailsHandler = (artist) => {
    setDisplay({
      title: "Artists Name",
      message: (
        <ul>
          <img
            src={artist.image}
            alt="artist"
            className={classes["artist-details"]}
          ></img>
          <li>
            <a href={artist.uri}>Profile</a>
          </li>
          <li>{artist.followers} Followers</li>
          <li>Genres:</li>
          <ol>
            {artist.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ol>
          <li>Popularity: {artist.popularity}</li>
        </ul>
      ),
    });
  };

  return (
    <div>
      {display && (
        <Modal
          title={display.title}
          message={display.message}
          onDismiss={modalDismissHandler}
        />
      )}
      <Card className={classes.artists}>
        {props.artists.map((artist) => (
          <ArtistsListItem
            image={artist.image}
            name={artist.name}
            uri={artist.uri}
            followers={artist.followers}
            genres={artist.genres}
            popularity={artist.popularity}
            onShowDetails={() => showDetailsHandler(artist)}
          />
        ))}
      </Card>
    </div>
  );
};

export default ArtistsList;
