import { Injectable } from '@angular/core';

import { Film } from '../models/film';
import { FilmDate } from '../models/film-date';

const FILMS_SESSION_STORAGE_KEY = '_films';
const FILM_DATES_SESSION_STORAGE_KEY = '_filmDates';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  films: Film[];
  filmDates: FilmDate[];

  constructor() {}

  setData(rawFilms: any[], rawFilmDates: any[]) {
    sessionStorage.setItem(FILMS_SESSION_STORAGE_KEY, JSON.stringify(rawFilms));
    sessionStorage.setItem(FILM_DATES_SESSION_STORAGE_KEY, JSON.stringify(rawFilmDates));
  }

  getFilms() {
    if (!this.films) {
      try {
        const films: Film[] = [];
        const rawFilms = JSON.parse(sessionStorage.getItem(FILMS_SESSION_STORAGE_KEY));
        rawFilms.forEach(fm => {
          const film = new Film();
          Object.assign(film, fm);
          films.push(film);
        });
        this.films = films;
      } catch (e) {
        return [];
      }
    }

    return this.films;
  }

  getFilmDates() {
    if (!this.filmDates) {
      try {
        const filmDates: FilmDate[] = [];
        const rawFilmDates = JSON.parse(sessionStorage.getItem(FILM_DATES_SESSION_STORAGE_KEY));
        rawFilmDates.forEach(fmDate => {
          const filmDate = new FilmDate();
          Object.assign(filmDate, fmDate);
          filmDate.date = new Date(filmDate.date);
          filmDates.push(filmDate);
        });
        this.filmDates = filmDates;
      } catch (e) {
        return [];
      }
    }

    return this.filmDates;
  }
}
