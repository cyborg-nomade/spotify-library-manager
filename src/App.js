import React, { useContext } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { MDBContainer } from "mdbreact";

import Card from "./components/UI/Card";
import MainHeader from "./components/nav/MainHeader";
import ArtistsList from "./components/artists/ArtistsList";

import AuthContext from "./store/auth-context";
import SearchContext from "./store/search-context";

import "./App.css";
import "react-spotify-auth/dist/index.css";

function App() {
  const artists = [
    {
      image:
        "https://lastfm.freetls.fastly.net/i/u/770x0/0412cd257d376691a8ae30a60a895f48.jpg#0412cd257d376691a8ae30a60a895f48",
      name: "Leprous",
      uri: "https://open.spotify.com/artist/4lgrzShsg2FLA89UM2fdO5",
      followers: 176204,
      genres: [
        "progressive metal",
        "progressive rock",
        "avant-garde metal",
        "alternative metal",
      ],
      popularity: 50,
    },
    {
      image:
        "https://lastfm.freetls.fastly.net/i/u/770x0/d0e143cee82d4059a7c146eaa810ac61.jpg#d0e143cee82d4059a7c146eaa810ac61",
      name: "Treta",
      uri: "https://open.spotify.com/artist/4v5UPw9aCl46yfMh2fTtMr",
      followers: 960,
      genres: ["hardcore punk"],
      popularity: 1,
    },
    {
      image:
        "https://lastfm.freetls.fastly.net/i/u/770x0/12ecb2a4d9344f86be967ed6cf63af53.jpg#12ecb2a4d9344f86be967ed6cf63af53",
      name: "Shpongle",
      uri: "https://open.spotify.com/artist/0m5XJwKGYyUjd3VMfcINCQ",
      followers: 229461,
      genres: ["psybient", "psytrance", "psydub"],
      popularity: 100,
    },
  ];

  const authContext = useContext(AuthContext);
  const searchContext = useContext(SearchContext);

  return (
    <React.Fragment>
      <MDBContainer>
        {authContext.token ? (
          <SpotifyApiContext.Provider value={authContext.token}>
            <MainHeader />
            <main>
              <Card className="search-label">{searchContext.searchedTerm}</Card>
              <ArtistsList artists={artists} />
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
                scopes={[Scopes.userReadPrivate, "user-read-email"]} // either style will work
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
