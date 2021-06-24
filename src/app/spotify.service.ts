import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl: string;
  private access_token: string;
  private clientId: string = '2b303ec936c34c9fa821c7831668c425';
  private secretId: string = 'bb1aa3ba8fc241a2b7cdf14c9b4a9920';
  items: any[] = [];
  audio;
  constructor(private http: HttpClient) {
    if (!sessionStorage.getItem('token')) {
      this.login();
    }
    this.audio = new Audio();
  }

  login() {
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic  ' + btoa(this.clientId + ':' + this.secretId),
        'Content-Type': 'application/x-www-form-urlencoded;',
      }),
    }).subscribe((res: any) => {
      sessionStorage.setItem('token', res.access_token);
      debugger
    });
  }

  searchMusic(str: string, type = 'artist') {
    this.searchUrl = `https://api.spotify.com/v1/search?query=${str}&offset=0&limit=20&type=${type}&market=US`;
    return this.http.get(this.searchUrl)
      .subscribe((res: any) => {
        debugger
        this.items = res.artists.items as any[];
      });
  }
  load(url) {
    this.audio.src = url;
    this.audio.load();
  }

  play(url) {
    this.load(url);
    this.audio.play()
  }

/*  getPlaylistTracks () {
    //Request for a playlist via Soundcloud using a client id
    return this.apiService.get('https://api.soundcloud.com/playlists/209262931', true)
      .map(res => res.json())
      .map(data => data.tracks);
  }*/

  randomTrack(tracks) {
    const trackLength = tracks.length;
    // Pick a random number
    const randomNumber = Math.floor((Math.random() * trackLength) + 1);
    // Return a random track
    return tracks[randomNumber];
  }

  formatTime(seconds) {
    let minutes:any = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  findTracks(value) {
    return /*this.apiService.get(`${this.apiService.prepareUrl('https://api.soundcloud.com/tracks')}&q=${value}`, false)
      .debounceTime(300)
      .distinctUntilChanged()
      .map(res => res.json())*/this.searchMusic("pink floyd")
  }

  xlArtwork(url) {
    return url.replace(/large/, 't500x500');
  }
}
