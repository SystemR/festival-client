import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CalendarService } from '../../services/calendar.service';
import { FilmDisplayService } from '../../services/film-display.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  currentDate: Date;
  today: number;
  dates = [];
  filmsByDateIndex: { [key: string]: any } = {};

  currentDateFilter: number;
  filterChanges$: Subscription;

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private filmService: FilmDisplayService
  ) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.today = this.currentDate.getDate();
    this.dates = this.calendarService.getDates();
    this.filmsByDateIndex = this.filmService.getfilmsByDateIndex();
    this.setCurrentDateFilter();

    this.filterChanges$ = this.filmService.filterChanges.subscribe(e => {
      this.setCurrentDateFilter();
    });
  }

  ngOnDestroy() {
    this.filterChanges$.unsubscribe();
  }

  private setCurrentDateFilter() {
    const currentDateFilter = this.filmService.getDateFilter();
    if (currentDateFilter) {
      this.currentDateFilter = +currentDateFilter.split('-')[2];
    } else {
      this.currentDateFilter = null;
    }
  }

  hasFilms(date: number) {
    const dateString = this.calendarService.getDateStringFromDateNum(date);
    return this.filmsByDateIndex[dateString];
  }

  navigate(date: number) {
    const dateString = this.calendarService.getDateStringFromDateNum(date);
    this.router.navigate(['/dates', dateString]);
  }
}
