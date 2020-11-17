import { Component } from '@angular/core';
import { SpotifyService } from '../app/spotify-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spotify-library-manager';
  artist: any;
  total: any;
  name: any;
  link: any;

  constructor(private spotify: SpotifyService) {}

  getFollowedArtists() {
    this.spotify.getFollowedArtists(1).subscribe((artist) => {
      this.artist = artist;
      console.log(this.artist);
    });
    this.total = this.artist.artists.total;
    this.name = this.artist.artists.items[0].name;
    this.link = this.artist.artists.items[0].external_urls.spotify;
  }
}
