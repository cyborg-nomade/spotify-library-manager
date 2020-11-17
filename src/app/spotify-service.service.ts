import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQDL6gophEEuEXHq8UdoEkPO3BJHA-r4mIpkgpgNnSPPMWC3CSiO_zVDsc8d5SJk6rLuFlo37LUqlptkXaMejvVfETqyJJyjDvKerZaFF3-Pe2MIh6yEAzlhOU-_eOfx-VNfaE9dUAHpentsM8fQCnZBoQmYDpTQ',
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

  getFollowedArtists(limit: number) {
    return this.getQuery(`me/following?type=artist&limit=${limit}`);
  }
}
