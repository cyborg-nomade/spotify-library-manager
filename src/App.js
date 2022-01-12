import React, { useContext, useState, useEffect } from "react";
import { SpotifyApiContext, UserAlbums } from "react-spotify-api";
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

  let spotifyApi = new SpotifyWebApi();

  const getTotalAlbumsSaved = () => {
    if (authContext.token) {
      spotifyApi.setAccessToken(authContext.token);
      spotifyApi.getMySavedAlbums({}, (error, result) => {
        console.log(result);
        setTotalAlbumsSaved(result.total);
      });
    }
    return <Card>Total Albums Saved: {totalAlbumsSaved}</Card>;
  };

  return (
    <React.Fragment>
      <MDBContainer>
        {authContext.token ? (
          <SpotifyApiContext.Provider value={authContext.token}>
            <MainHeader />
            <main>
              <Card className="search-label">{searchContext.searchedTerm}</Card>
              {getTotalAlbumsSaved()}
              <ArtistsList />
            </main>
            <p>You are authorized with token: {authContext.token}</p>
          </SpotifyApiContext.Provider>
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
