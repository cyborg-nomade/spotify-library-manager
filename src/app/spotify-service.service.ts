import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Artist } from './artists.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private followedArtists: Artist[] = [];
  private currentArtists: any;
  private indexArtist: Artist = {
    id: 0,
    name: '',
    link: '',
    genres: [],
    imageURL: '',
    poplarity: 0,
    spotifyURI: '',
  };

  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAn1xkUeUaGDvdteShyxOHF9135ORMNaU-ygPVk0UERztapdM_x4yVm8xoNkn3b6wS7SO2Ii2ZSJCZioieKxjeknCu_YExGZU4xHDHZDgdbvem0Ys9yJjRCNn3NUZzbBXCqD3YBLVtAK_X1nRAdm5IkmOAYrPj4',
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
    // tslint:disable-next-line: prefer-const

    this.getQuery(`me/following?type=artist&limit=50`).subscribe(
      (currentArtists) => {
        this.currentArtists = currentArtists.artists.items;

        for (const artist of this.currentArtists) {
          this.indexArtist.id = artist.id;
          this.indexArtist.name = artist.name;
          this.indexArtist.link = artist.external_urls.spotify;
          this.indexArtist.genres = artist.genres;
          // this.indexArtist.imageURL = artist.images[0].url;
          this.indexArtist.poplarity = artist.popularity;
          this.indexArtist.spotifyURI = artist.uri;
          console.log(this.indexArtist);

          this.followedArtists.push(this.indexArtist);
          console.log(this.followedArtists);
        }

        // return this.followedArtists;
      }
    );

    console.log(this.followedArtists);
    return this.followedArtists;
  }

  getTotalArtists() {
    let currentArtists: any;

    this.getQuery(`me/following?type=artist&limit=50`).subscribe((artists) => {
      currentArtists = artists;
    });
    console.log(currentArtists.total);

    return currentArtists.total;
  }
}
