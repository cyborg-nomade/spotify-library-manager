import React, { useState } from "react";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import Modal from "../UI/Modal";

import classes from "./ArtistsList.module.css";
import useGetAllFollowedArtists from "./../../hooks/use-getAllFollowedArtists";

const ArtistsList = (props) => {
  const [display, setDisplay] = useState();

  const modalDismissHandler = () => {
    setDisplay(null);
  };

  const showDetailsHandler = (artist) => {
    console.log(artist);

    setDisplay({
      title: artist.name,
      message: (
        <ul>
          <img
            src={artist.images[0]?.url}
            alt="artist"
            className={classes["artist-details"]}
          ></img>
          <li>
            <a href={artist.uri}>Profile</a>
          </li>
          <li>{artist.followers.total} Followers</li>
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

  const { allFollowedArtists, totalFollowedArtists } =
    useGetAllFollowedArtists();

  return (
    <React.Fragment>
      {display && (
        <Modal
          title={display.title}
          message={display.message}
          onDismiss={modalDismissHandler}
        />
      )}
      {allFollowedArtists ? (
        <Card className={classes.artists}>
          <Card>Total Followed Artists: {totalFollowedArtists}</Card>
          <Card>
            {allFollowedArtists.map((artist, index) => {
              return (
                <ArtistsListItem
                  key={index}
                  image={artist.images[0]?.url}
                  name={artist.name}
                  uri={artist.uri}
                  followers={artist.followers.total}
                  genres={artist.genres}
                  popularity={artist.popularity}
                  onShowDetails={() => showDetailsHandler(artist)}
                />
              );
            })}
          </Card>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
