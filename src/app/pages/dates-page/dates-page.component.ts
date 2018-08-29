import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ActiveFilmService } from '../../services/active-film.service';
import { CalendarService } from '../../services/calendar.service';
import { FilmDisplayService } from '../../services/film-display.service';

@Component({
  selector: 'app-dates-page',
  templateUrl: './dates-page.component.html',
  styleUrls: ['./dates-page.component.scss']
})
export class DatesPageComponent implements OnInit, OnDestroy {
  currentDate: string;

  routerEvents$: Subscription;
  filterChanges$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private filmService: FilmDisplayService,
    private activeFilmService: ActiveFilmService
  ) {}

  ngOnInit() {
    this.routerEvents$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.indexOf('/dates') === 0) {
          this.handleUrl();
        }
      }
    });

    this.filterChanges$ = this.filmService.filterChanges.subscribe(e => {
      if (e) {
        this.currentDate = this.filmService.getDateFilter();
      }
    });

    this.handleUrl();
  }

  ngOnDestroy() {
    this.routerEvents$.unsubscribe();
    this.filterChanges$.unsubscribe();
  }

  handleUrl() {
    const url = this.activatedRoute.snapshot.url;
    if (url.length === 1) {
      this.navigateToToday();
    } else if (url.length === 2) {
      const date = url[1].path;
      this.filterByDate(date);
    }
  }

  private navigateToToday() {
    const date = this.calendarService.getDateString(new Date());
    this.router.navigate(['/dates', date]);
  }

  private filterByDate(date: string) {
    this.filmService.setDateFilter(date);
    this.currentDate = date;
    this.activeFilmService.clearActive();
  }
}
