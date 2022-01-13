import { useState, useContext, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import AuthContext from "../store/auth-context";

const useGetAllFollowedArtists = () => {
  const authContext = useContext(AuthContext);

  const [totalFollowedArtists, setTotalFollowedArtists] = useState(0);
  const [allFollowedArtists, setAllFollowedArtists] = useState([]);
  const [after, setAfter] = useState();
  const [next, setNext] = useState("");

  useEffect(() => {
    const spotifyApi = new SpotifyWebApi();

    if (authContext.token) {
      console.log(authContext.token);
      spotifyApi.setAccessToken(authContext.token);
      try {
        spotifyApi.getFollowedArtists({ limit: 50 }, (error, result) => {
          if (error) {
            console.log(error);
          }
          console.log(result);
          setTotalFollowedArtists(result.artists.total);
          setAllFollowedArtists(result.artists.items);
          //   setAfter(result.artists.cursors.after);
          //   setNext(result.artists.next);
        });
      } catch (error) {
        console.log(error);
        // return {
        //   allFollowedArtists,
        //   totalFollowedArtists,
        // };
      }
    }

    // if (next) {
    //   try {
    //     spotifyApi.getFollowedArtists(
    //       { limit: 50, after: after },
    //       (error, result) => {
    //         if (error) {
    //           return error;
    //         }
    //         setAfter(result.artists.cursors.after);
    //         setNext(result.artists.next);
    //         setAllFollowedArtists((artistsArray) => [
    //           ...artistsArray,
    //           ...result.artists.items,
    //         ]);
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //     return {
    //       allFollowedArtists,
    //       totalFollowedArtists,
    //     };
    //   }
    // }
  }, [authContext.token, next]);

  const sortedArray = allFollowedArtists.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  //   const uniqArray = [...new Set(sortedArray)];
  //   setAllFollowedArtists(uniqArray);

  return {
    allFollowedArtists,
    totalFollowedArtists,
  };
};

export default useGetAllFollowedArtists;
