import ArtistsListItem from "./ArtistsListItem";
import Card from "../UI/Card";
import "./ArtistsList.css";
import React from "react";

const ArtistsList = (props) => {
  const artists = props.artists;

  return (
    <Card className="artists">
      <ArtistsListItem
        image={artists[0].image}
        name={artists[0].name}
        uri={artists[0].uri}
        followers={artists[0].followers}
        genres={artists[0].genres}
        popularity={artists[0].popularity}
      />
      <ArtistsListItem
        image={artists[1].image}
        name={artists[1].name}
        uri={artists[1].uri}
        followers={artists[1].followers}
        genres={artists[1].genres}
        popularity={artists[1].popularity}
      />
      <ArtistsListItem
        image={artists[2].image}
        name={artists[2].name}
        uri={artists[2].uri}
        followers={artists[2].followers}
        genres={artists[2].genres}
        popularity={artists[2].popularity}
      />
    </Card>
  );
};

export default ArtistsList;
