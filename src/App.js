import React, { useState, useEffect } from "react";

import ArtistsList from "./components/artists/ArtistsList";
import Navbar from "./components/nav/Navbar";
import Card from "./components/UI/Card";

import "./App.css";

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

  const [searchedTerm, setSearchedTerm] = useState("");

  const searchBarChangedHandler = (event) => {
    setSearchedTerm(event.target.value);
  };

  // basic login logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn");

    if (storedLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <Navbar onSearchTermChanged={searchBarChangedHandler} />
      <Card className="search-label">{searchedTerm}</Card>
      <ArtistsList artists={artists} />
    </React.Fragment>
  );
}

export default App;
