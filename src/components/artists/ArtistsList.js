import React, { useState } from "react";
import { UserArtists } from "react-spotify-api";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

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
            src={artist.images[0].url}
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

  const artistRowRenderer = (artistsObject) => {};

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
          {({ data: artists, loading, loadMoreData }) => {
            if (artists && !loading) {
              let artistsArray = artists.artists.items;
              artistsArray.sort((a, b) => a.name.localeCompare(b.name));

              return (
                <React.Fragment>
                  <Card>Total Artists: {artists.artists.total}</Card>
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
                </React.Fragment>
              );
            } else {
              return <h1>No artists here</h1>;
            }
          }}
        </UserArtists>
      </Card>
    </React.Fragment>
  );
};

export default ArtistsList;
