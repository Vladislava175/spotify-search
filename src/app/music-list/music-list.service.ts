import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MusicList} from './music-list';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MusicListService {

  $musicList: Observable<MusicList[]>;
  musicList;
  private searchUrl: string;
  private access_token: string;
  private clientId: string = '2b303ec936c34c9fa821c7831668c425';
  private secretId: string = 'bb1aa3ba8fc241a2b7cdf14c9b4a9920';
  audio;

  constructor(private http: HttpClient) {
    if (!sessionStorage.getItem('token')) {
      this.login();
    }
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
    });
  }

  getMusicList(queryString: string, type = 'track'): Observable<any[]> {
    this.searchUrl = `https://api.spotify.com/v1/search?query=${queryString}&offset=0&limit=5&type=${type}&market=US`;
    if (!this.$musicList) {
      this.$musicList = this.http.get<any[]>(this.searchUrl).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.$musicList;

  }

  clearCache() {
    this.$musicList = null;
  }

  getById(id:string) {
    this.searchUrl = `https://api.spotify.com/v1/artists/${id}`;
    this.http.get<any[]>(this.searchUrl).subscribe(res=>{
debugger
    })
  }
}
