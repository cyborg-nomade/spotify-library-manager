import { Component } from '@angular/core';
import { SpotifyService } from '../app/spotify-service.service';
import { Artist } from './artists.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spotify-library-manager';
  followedArtists: Artist[];
  total: number;

  constructor(private spotify: SpotifyService) {}

  getFollowedArtists() {
    this.followedArtists = this.spotify.getFollowedArtists();
  }

  getTotalArtists() {
    this.total = this.spotify.getTotalArtists();
  }
}
