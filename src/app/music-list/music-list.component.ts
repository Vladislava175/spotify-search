import { Component, OnChanges, OnInit } from '@angular/core';
import { MusicListService } from './music-list.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit{

  constructor(public musicListService: MusicListService) { }

  ngOnInit(): void {}

  searchSong(value) {
    this.musicListService.getMusicList(value).subscribe((music:any) => {
      this.musicListService.musicList = music.tracks.items;
      sessionStorage.setItem("list", JSON.stringify(music.tracks.items))
    })
  }

}
