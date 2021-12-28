import React, { useState } from "react";
import { UserArtists } from "react-spotify-api";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import Modal from "../UI/Modal";

import classes from "./ArtistsList.module.css";

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
            src={artist.image[0].url}
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
    <React.Fragment>
      {display && (
        <Modal
          title={display.title}
          message={display.message}
          onDismiss={modalDismissHandler}
        />
      )}
      <Card className={classes.artists}>
        <UserArtists>
          {(artists, loading, error) => {
            console.log(artists.data);

            if (artists.data) {
              console.log(artists.data);
              return artists.data.artists.items.map((artist) => {
                console.log(artist.name);
                return (
                  <React.Fragment>
                    <h1>{artists.data.artists.total}</h1>
                    <ArtistsListItem
                      key={artist.uri}
                      image={artist.images[0].url}
                      name={artist.name}
                      uri={artist.uri}
                      followers={artist.followers.total}
                      genres={artist.genres}
                      popularity={artist.popularity}
                      onShowDetails={() => showDetailsHandler(artist)}
                    />
                  </React.Fragment>
                );
              });
            } else {
              console.log("No artists here");
              return null;
            }
          }}
        </UserArtists>
      </Card>
    </React.Fragment>
  );
};

export default ArtistsList;
