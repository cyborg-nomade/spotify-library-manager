import { useState, useContext, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import AuthContext from "../store/auth-context";

const spotifyApi = new SpotifyWebApi();

const getAllPages = async (request) => {
  const paginatedResponse = await request;
  console.log(paginatedResponse.artists.next);

  let currentResponse = paginatedResponse;

  console.log(currentResponse.artists.next);

  while (currentResponse.artists.next) {
    currentResponse = await spotifyApi.getGeneric(currentResponse.artists.next);
    console.log(currentResponse.artists.items);
    paginatedResponse.artists.items = [
      ...paginatedResponse.artists.items,
      ...currentResponse.artists.items,
    ];
    console.log(paginatedResponse.artists.items);
  }

  console.log(paginatedResponse);

  return paginatedResponse;
};

const useGetAllFollowedArtists = () => {
  const authContext = useContext(AuthContext);

  const [totalFollowedArtists, setTotalFollowedArtists] = useState(0);
  const [allFollowedArtists, setAllFollowedArtists] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      spotifyApi.setAccessToken(authContext.token);
      const response = await getAllPages(
        spotifyApi.getFollowedArtists({ limit: 50 })
      );
      console.log(response);
      setTotalFollowedArtists(response.artists.total);
      setAllFollowedArtists(
        response.artists.items.sort((a, b) => a.name.localeCompare(b.name))
      );
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }, [authContext.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const sortedArray = allFollowedArtists
  //   const uniqArray = [...new Set(sortedArray)];
  //   setAllFollowedArtists(uniqArray);

  return {
    allFollowedArtists,
    totalFollowedArtists,
    error,
  };
};

export default useGetAllFollowedArtists;
