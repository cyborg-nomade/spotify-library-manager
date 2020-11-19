import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Artist } from './artists.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // private followedArtists: Artist[] = [];
  // private currentArtists: any;
  // private indexArtist: Artist = {
  //   id: 0,
  //   name: '',
  //   link: '',
  //   genres: [],
  //   imageURL: '',
  //   poplarity: 0,
  //   spotifyURI: '',
  // };

  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQDP58QJjfMnGsob4oPDsOTi3D3OoDCzXsRvrZowejUCb1mblZXG3Kks8NrbXMUqvp1yW70AzwAXGjt3eWlM_OqkwxC5OGBOq5q1C86qip5-MXuv7I1tuDBwlcUZxjiTzTPGMtF9d3r047P41qVx8RZL077QuSRW',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data['albums'].items)
    );
  }

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(idArtist: string) {
    return this.getQuery(`artists/${idArtist}/top-tracks?country=us`).pipe(
      map((data) => data['tracks'])
    );
  }

  getFollowedArtistsPage(after?: string) {
    if (after) {
      after = '&' + after;
    } else {
      after = '';
    }

    return this.getQuery(`me/following?type=artist${after}&limit=50`).pipe(
      map((respData: any) => {
        const followedArtists = {
          artistsArray: [],
          nextPage: '',
        };
        const currentCrudeArrayArtists = [];
        console.log(respData);

        for (const key in respData) {
          if (Object.prototype.hasOwnProperty.call(respData, key)) {
            currentCrudeArrayArtists.push(...respData.artists.items);
            followedArtists.nextPage = respData.artists.cursors.after;
          }
        }

        console.log(followedArtists.nextPage);

        for (const artist of currentCrudeArrayArtists) {
          const indexArtist: Artist = {
            id: 0,
            name: '',
            link: '',
            genres: [],
            imageURL: '',
            poplarity: 0,
            spotifyURI: '',
          };
          indexArtist.id = artist.id;
          indexArtist.name = artist.name;
          indexArtist.link = artist.external_urls.spotify;
          indexArtist.genres = artist.genres;
          if (artist.images.length !== 0) {
            indexArtist.imageURL = artist.images[0].url;
          } else {
            indexArtist.imageURL = '';
          }
          indexArtist.poplarity = artist.popularity;
          indexArtist.spotifyURI = artist.uri;
          console.log(indexArtist.name, artist.name);
          console.log(indexArtist);
          followedArtists.artistsArray.push(indexArtist);
        }
        return followedArtists;
      })
    );
  }

  // TODO: get all pages and append them to the followedArtists array
  // getAllFollowedArtists() {
  //   return this.getFollowedArtistsPage().pipe();
  // }

  getTotalArtists() {
    return this.getQuery(`me/following?type=artist&limit=50`).pipe(
      map((respData: any) => {
        let totalFollowedArtists: number;

        for (const key in respData) {
          if (Object.prototype.hasOwnProperty.call(respData, key)) {
            totalFollowedArtists = respData.artists.total;
          }
        }
        return totalFollowedArtists;
      })
    );
  }
}
