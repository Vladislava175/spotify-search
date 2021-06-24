import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicListService} from '../../music-list/music-list.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss']
})
export class MusicDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private musicListService: MusicListService) {
  }

  ngOnInit(): void {
    let item = this.musicListService.musicList.find(f => f.track_number == Number(this.route.snapshot.paramMap.get('id')));
    debugger
    this.musicListService.getById(item.artists[0].id)
  }

}
