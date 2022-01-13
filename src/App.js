import React, { useContext, useState, useEffect, useCallback } from "react";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { MDBContainer } from "mdbreact";
import SpotifyWebApi from "spotify-web-api-js";

import Card from "./components/UI/Card";
import MainHeader from "./components/nav/MainHeader";
import ArtistsList from "./components/artists/ArtistsList";

import AuthContext from "./store/auth-context";
import SearchContext from "./store/search-context";

import "./App.css";
import "react-spotify-auth/dist/index.css";

function App() {
  const [totalAlbumsSaved, setTotalAlbumsSaved] = useState(0);

  const authContext = useContext(AuthContext);
  const searchContext = useContext(SearchContext);

  const getTotalAlbumsSaved = useCallback(async () => {
    let spotifyApi = new SpotifyWebApi();
    if (authContext.token) {
      spotifyApi.setAccessToken(authContext.token);
      await spotifyApi.getMySavedAlbums({}, (error, result) => {
        // console.log(result);
        setTotalAlbumsSaved(result.total);
      });
    }
  }, [authContext.token]);

  useEffect(() => {
    getTotalAlbumsSaved();
  }, [getTotalAlbumsSaved]);

  return (
    <React.Fragment>
      <MDBContainer>
        {authContext.token ? (
          <React.Fragment>
            <MainHeader />
            <main>
              <Card className="search-label">{searchContext.searchedTerm}</Card>
              <Card>Total Albums Saved: {totalAlbumsSaved}</Card>
              <ArtistsList />
            </main>
            <p>You are authorized with token: {authContext.token}</p>
          </React.Fragment>
        ) : (
          <div className="login-page">
            <h1>Welcome to Spotify Library Manager</h1>
            <h2>Sign in to get started</h2>
            {/* Display the login page */}
            <div className="spotifyBtn">
              <SpotifyAuth
                redirectUri="http://localhost:3000/callback"
                clientID="03e028b307ca44d687a7445042a004ef"
                scopes={[
                  Scopes.userReadPrivate,
                  "user-read-email",
                  "user-follow-read",
                  "user-library-read",
                ]} // either style will work
                onAccessToken={(token) => authContext.onLogin(token)}
              />
            </div>
          </div>
        )}
      </MDBContainer>
    </React.Fragment>
  );
}

export default App;
