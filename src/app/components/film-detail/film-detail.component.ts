import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Film } from '../../models/film';
import { FilmDate } from '../../models/film-date';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  @Input()
  film: Film;

  @Input()
  filmDates: FilmDate[];

  @Output()
  buyTicket = new EventEmitter<Film>();

  constructor() {}

  ngOnInit() {}

  showTicketPage() {
    this.buyTicket.emit(this.film);
  }
}
