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
    console.log(artist);

    setDisplay({
      title: "Artists Name",
      message: (
        <ul>
          <img
            src={artist.images[0].url}
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

  const totalArtists = (total) => {
    return <Card>Total Artists: {total}</Card>;
  };

  const artistsArrayRenderer = (artistsArray) => {
    return (
      <Card>
        {artistsArray.map((artist) => {
          return (
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
          );
        })}
      </Card>
    );
  };

  let artistsListRenderer = ({ data: artists, loading, loadMoreData }) => {
    if (artists && !loading) {
      console.log(artists.artists.next);
      console.log(artists.artists.items);
      loadMoreData();
      console.log(artists.artists.next);

      let artistsArray = artists.artists.items;
      artistsArray.sort((a, b) => a.name.localeCompare(b.name));

      return (
        <React.Fragment>
          {totalArtists(artists.artists.total)}
          {artistsArrayRenderer(artistsArray)}
        </React.Fragment>
      );
    } else {
      return <h1>No artists here</h1>;
    }
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
        <UserArtists>{artistsListRenderer}</UserArtists>
      </Card>
    </React.Fragment>
  );
};

export default ArtistsList;
