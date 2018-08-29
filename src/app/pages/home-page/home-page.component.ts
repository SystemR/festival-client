import { Component, OnInit } from '@angular/core';

import { ActiveFilmService } from '../../services/active-film.service';
import { FilmDisplayService } from '../../services/film-display.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private filmService: FilmDisplayService,
    private activeFilmService: ActiveFilmService
  ) {}

  ngOnInit() {
    this.filmService.clearDateFilter();
    this.activeFilmService.clearActive();
  }
}
