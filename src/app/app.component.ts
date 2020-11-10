import { Component } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotify-library-manager';
  spotifyApi: any;
  artists: any;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
  }

  getArtists() {
    // this.artists = this.spotifyApi.getFollowedArtists();
  }
}
