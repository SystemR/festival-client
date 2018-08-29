import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { FilmBox } from '../models/film-box';

@Injectable({
  providedIn: 'root'
})
export class ActiveFilmService {
  activeFilmBox: FilmBox;
  public readonly changes = new Subject<FilmBox>();

  constructor() {}

  setActive(filmBox: FilmBox) {
    this.activeFilmBox = filmBox;
    this.changes.next(filmBox);
  }

  clearActive() {
    this.activeFilmBox = null;
    this.changes.next(null);
  }
}
