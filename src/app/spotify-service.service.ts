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
        'Bearer BQDDjpiBHIPgxOJ9Fc3kvvme1TcC5l20uGHddDc6wJ5v2Yxt5BKuq7VuY0Co1OXWIcSgOV-UV0ZBvB61i3DpRUc0CyPalqQ8u4rdWsFmSof5_Njrhs0OHcLSQFDahLbDk__IVN41rpBYzyWcUoYEN4nf94c7SlBh',
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

  getFollowedArtists() {
    return this.getQuery(`me/following?type=artist&limit=50`).pipe(
      map((respData: any) => {
        const followedArtists = [];
        console.log(followedArtists);

        const currentCrudeArrayArtists = [];
        for (const key in respData) {
          if (Object.prototype.hasOwnProperty.call(respData, key)) {
            currentCrudeArrayArtists.push(...respData.artists.items);
          }
        }
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
          followedArtists.push(indexArtist);
        }
        return followedArtists;
      })
    );
  }

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
