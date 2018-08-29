import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FilmBox } from '../../models/film-box';
import { ActiveFilmService } from '../../services/active-film.service';
import { FilmDisplayService } from '../../services/film-display.service';
import { PositioningService } from '../../services/positioning.service';

const SEARCH_AFTER_MS = 100;

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit, OnDestroy {
  filmBoxes: FilmBox[];
  isDatesShown = false;
  displayedFilmBoxes = 0;

  currentFilmBox: FilmBox = null;
  hasFilter = false;
  searchDebounceTimeout: any;
  animStep = 0;

  routerEvents$: Subscription;
  keyboardEvent$: Subscription;
  windowEvent$: Subscription;
  activeFilmChanges$: Subscription;
  filterChanges$: Subscription;

  constructor(
    private filmService: FilmDisplayService,
    private positioningService: PositioningService,
    private router: Router,
    private activeFilmService: ActiveFilmService
  ) {
    const films = filmService.getFilms();

    const filmBoxes = [];
    films.forEach(f => {
      const filmBox = new FilmBox();
      filmBox.film = f;
      filmBox.isDisplayed = true;
      filmBoxes.push(filmBox);
    });
    this.filmBoxes = filmBoxes;
  }

  ngOnInit() {
    this.routerEvents$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.indexOf('/film/') >= 0) {
          const filmName = url.substring(6);
          const currentFilmBox = this.filmBoxes.find(f => {
            return f.film.name === filmName;
          });
          if (currentFilmBox) {
            this.setCurrentFilm(currentFilmBox);
          }
        } else {
          if (url.indexOf('/dates') === 0) {
            this.isDatesShown = true;
            this.positioningService.setResetPositions(this.filmBoxes);
            this.repositions();
            this.animStep++;
          } else {
            this.isDatesShown = false;
            this.repositions();
            this.animStep++;
          }
        }
      }
    });

    this.keyboardEvent$ = fromEvent(document, 'keyup').subscribe((e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        this.activeFilmService.clearActive();
      }
    });

    this.windowEvent$ = fromEvent(window, 'resize')
      .pipe(debounceTime(50))
      .subscribe(event => {
        const currentFilmBox = this.currentFilmBox;
        if (currentFilmBox) {
          this.positioningService.repositionsActive(currentFilmBox);
          this.animStep++;
        } else {
          this.repositions();
          this.animStep++;
        }
      });

    this.activeFilmChanges$ = this.activeFilmService.changes.subscribe(filmBox => {
      if (!filmBox) {
        this.closeActiveFilmBox();
      }
    });

    this.filterChanges$ = this.filmService.filterChanges.subscribe(hasFilter => {
      this.hasFilter = hasFilter;
      const filmBoxes = this.filmBoxes;
      clearTimeout(this.searchDebounceTimeout);
      if (hasFilter) {
        this.searchDebounceTimeout = setTimeout(() => {
          const filteredFilms = this.filmService.getFilteredFilms();
          let displayedFilmBoxes = 0;
          filmBoxes.forEach(fb => {
            if (filteredFilms.indexOf(fb.film) >= 0) {
              fb.isDisplayed = true;
              displayedFilmBoxes++;
            } else {
              fb.isDisplayed = false;
            }
          });
          this.displayedFilmBoxes = displayedFilmBoxes;
          this.repositions();
          this.animStep++;
        }, SEARCH_AFTER_MS);
      } else {
        let displayedFilmBoxes = 0;
        filmBoxes.forEach(fb => {
          fb.isDisplayed = true;
          displayedFilmBoxes++;
        });
        this.displayedFilmBoxes = displayedFilmBoxes;

        this.repositions();
        this.animStep++;
      }
    });
  }

  ngOnDestroy() {
    this.routerEvents$.unsubscribe();
    this.keyboardEvent$.unsubscribe();
    this.windowEvent$.unsubscribe();
    this.activeFilmChanges$.unsubscribe();
    this.filterChanges$.unsubscribe();
  }

  closeActiveFilmBox() {
    let route = ['/films'];
    if (this.isDatesShown) {
      const dateFilter = this.filmService.getDateFilter();
      if (dateFilter) {
        route = ['/dates', dateFilter];
      } else {
        route = ['/dates'];
      }
    }
    this.router.navigate(route);
    this.currentFilmBox = null;
    this.repositions();
    this.animStep++;
  }

  repositions() {
    if (this.currentFilmBox) {
      this.positioningService.repositionsActive(this.currentFilmBox);
    } else if (this.isDatesShown) {
      this.positioningService.setByDatesGridPositions(this.filmBoxes);
    } else {
      this.positioningService.setAllFilmsGridPositions(this.filmBoxes);
    }
  }

  setCurrentFilm(filmBox: FilmBox) {
    if (this.currentFilmBox !== filmBox) {
      this.positioningService.setResetPositions(this.filmBoxes);
      this.currentFilmBox = filmBox;
      this.activeFilmService.setActive(filmBox);
      this.positioningService.repositionsActive(filmBox);
      this.router.navigate(['film', filmBox.film.name]);
      this.animStep++;
    }
  }
}
