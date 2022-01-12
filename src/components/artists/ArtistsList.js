import React, { useState, useContext, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import Card from "../UI/Card";
import ArtistsListItem from "./ArtistsListItem";
import Modal from "../UI/Modal";

import classes from "./ArtistsList.module.css";
import AuthContext from "../../store/auth-context";

const ArtistsList = (props) => {
  const authContext = useContext(AuthContext);

  const [display, setDisplay] = useState();
  const [totalFollowedArtists, setTotalFollowedArtists] = useState(0);
  const [allFollowedArtists, setAllFollowedArtists] = useState([]);
  const [after, setAfter] = useState();

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

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const getTotalFollowedArtists = useCallback(async () => {
    let spotifyApi = new SpotifyWebApi();

    if (authContext.token) {
      spotifyApi.setAccessToken(authContext.token);
      await spotifyApi.getFollowedArtists({ limit: 50 }, (error, result) => {
        setTotalFollowedArtists(result.artists.total);
      });
    }
  }, [authContext.token]);

  const getAllFollowedArtists = useCallback(async () => {
    let spotifyApi = new SpotifyWebApi();

    if (authContext.token) {
      spotifyApi.setAccessToken(authContext.token);
      await spotifyApi.getFollowedArtists({ limit: 50 }, (error, result) => {
        setAllFollowedArtists(result.artists.items);
        setAfter(result.artists.cursors.after);
      });

      if (allFollowedArtists.length < totalFollowedArtists) {
        await spotifyApi.getFollowedArtists(
          { limit: 50, after: after },
          (error, result) => {
            if (error) {
              console.log(error);
              return;
            }
            setAfter(result.artists.cursors.after);
            setAllFollowedArtists((artistsArray) => [
              ...artistsArray,
              ...result.artists.items,
            ]);
          }
        );
        await sleep(500);
      }
    }
    const sortedArray = allFollowedArtists.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const uniqArray = [...new Set(sortedArray)];
    setAllFollowedArtists(uniqArray);
  }, [authContext.token, after, allFollowedArtists, totalFollowedArtists]);

  useEffect(() => {
    getTotalFollowedArtists();
    getAllFollowedArtists();
  }, [getAllFollowedArtists, getTotalFollowedArtists]);

  return (
    <React.Fragment>
      {display && (
        <Modal
          title={display.title}
          message={display.message}
          onDismiss={modalDismissHandler}
        />
      )}
      {authContext.token ? (
        <Card className={classes.artists}>
          <Card>Total Followed Artists: {totalFollowedArtists}</Card>
          {allFollowedArtists ? (
            <Card>
              {allFollowedArtists.map((artist) => {
                return (
                  <ArtistsListItem
                    key={artist.uri}
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
          ) : null}
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
