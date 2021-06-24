import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {MusicListService} from '../../music-list/music-list.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() music;

  constructor() { }

  ngOnInit(): void {}

}
