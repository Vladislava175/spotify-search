import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicListService} from '../../music-list/music-list.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss']
})
export class MusicDetailsComponent implements OnInit {
  track: any = null;
  fileUrl;
  index = 0;

  constructor(private route: ActivatedRoute, public musicListService: MusicListService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.track = JSON.parse(sessionStorage.getItem('list')).find(f => f.track_number == Number(this.route.snapshot.paramMap.get('id')));
    this.musicListService.getById(this.track.artists[0].id);
    this.change();
  }

  change() {
/*    setTimeout(() => {
      console.log('change');
      document.getElementById('photo').src = this.track.album.images[this.index];
      if (this.index == this.track.album.images.length) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.change();

    }, 5000);*/
  }
}
