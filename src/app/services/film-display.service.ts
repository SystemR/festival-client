import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Film } from '../models/film';
import { FilmDate } from '../models/film-date';
import { CalendarService } from './calendar.service';
import { SessionDataService } from './session-data.service';

@Injectable({
  providedIn: 'root'
})
export class FilmDisplayService {
  allFilms: Film[] = [];
  filteredFilms: Film[] = [];

  filmsByDateIndex: { [dateString: string]: Film[] } = {};
  datesByFilmIndex: { [filmId: number]: FilmDate[] } = {};

  filterChanges = new Subject<boolean>();

  dateFilter: string;
  searchFilter: string;

  constructor(sessionDataService: SessionDataService, calendarService: CalendarService) {
    const films = sessionDataService.getFilms();
    const filmDates = sessionDataService.getFilmDates();
    this.allFilms = films;

    const filmsIndex = {};
    films.forEach(f => {
      filmsIndex[f.id] = f;
    });

    const filmDatesIndex = {};

    filmDates.forEach(d => {
      const dateString = calendarService.getDateString(d.date);
      const film = filmsIndex[d.filmId];

      // Add to films by date index
      if (!this.filmsByDateIndex[dateString]) {
        this.filmsByDateIndex[dateString] = [];
      }
      this.filmsByDateIndex[dateString].push(film);

      // Add to dates by film index
      if (!this.datesByFilmIndex[film.id]) {
        this.datesByFilmIndex[film.id] = [];
      }
      this.datesByFilmIndex[film.id].push(d);
    });
  }

  getFilms(): Film[] {
    return this.allFilms;
  }

  getFilteredFilms(): Film[] {
    return this.filteredFilms;
  }

  getfilmsByDateIndex(): { [dateString: string]: Film[] } {
    return this.filmsByDateIndex;
  }

  getDatesByFilmName(filmId: number): FilmDate[] {
    return this.datesByFilmIndex[filmId];
  }

  getDateFilter() {
    return this.dateFilter;
  }

  setDateFilter(dateFilter: string) {
    this.dateFilter = dateFilter;
    this.search();
  }

  clearDateFilter() {
    this.dateFilter = null;
    this.search();
  }

  setSearchFilter(searchFilter: string) {
    this.searchFilter = searchFilter;
    this.search();
  }

  search() {
    const dateFilter = this.dateFilter;
    let searchFilter = this.searchFilter;
    if (dateFilter || (searchFilter && searchFilter.length > 2)) {
      this.filteredFilms = this.allFilms.slice(0);
      if (dateFilter) {
        const filmsByDates = this.filmsByDateIndex[dateFilter];
        if (filmsByDates) {
          this.filteredFilms = this.filteredFilms.filter(f => {
            let found = false;
            for (let i = 0, len = filmsByDates.length; i < len && found === false; i++) {
              if (f.name === filmsByDates[i].name) {
                found = true;
              }
            }
            return found;
          });
        } else {
          this.filteredFilms = [];
        }
      }

      if (searchFilter) {
        searchFilter = searchFilter.toLowerCase();
        this.filteredFilms = this.filteredFilms.filter(f => {
          for (const prop in f) {
            if (prop && this.isMatch(f[prop], searchFilter)) {
              return true;
            }
          }
          return false;
        });
      }
      this.filterChanges.next(true);
    } else {
      this.filteredFilms = this.allFilms.slice(0);
      this.filterChanges.next(false);
    }
  }

  private isMatch(prop: any, keyword: string) {
    const propType = typeof prop;
    if (propType === 'object') {
      prop = JSON.stringify(prop);
    } else if (propType !== 'string') {
      prop = prop.toString();
    }
    return prop.toLowerCase().indexOf(keyword) >= 0;
  }
}
