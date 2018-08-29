import { Injectable } from '@angular/core';

import { FilmBox } from '../models/film-box';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class PositioningService {
  calendarDatesRow = 0;
  constructor(calendarService: CalendarService) {
    this.calendarDatesRow = calendarService.getDates().length;
  }

  repositionsActive(filmBox: FilmBox) {
    const containerWidth = window.innerWidth;
    let left = 100;
    let top = -110;
    let width = containerWidth - left * 3;
    if (containerWidth <= 768) {
      left = 0;
      width = containerWidth - 26;
      top = -175;
    } else if (width > 940) {
      width = 940;
      left = (containerWidth - width) / 2 - 35;
    }
    filmBox.width = width;
    filmBox.left = left;
    filmBox.top = top;
  }

  setResetPositions(filmBoxes: FilmBox[]) {
    for (let i = 0, len = filmBoxes.length; i < len; i++) {
      const filmBox = filmBoxes[i];
      filmBox.width = 0;
      filmBox.left = 0;
      filmBox.top = 0;
    }
  }

  setAllFilmsGridPositions(filmBoxes: FilmBox[]) {
    const containerWidth = window.innerWidth;

    let width = 390;
    if (containerWidth <= 768) {
      width = containerWidth - 28;
    } else if (containerWidth <= 1050) {
      width = Math.round(containerWidth / 2) - 50;
    } else if (containerWidth <= 1320) {
      width = Math.round(containerWidth / 3) - 40;
    } else {
      width = Math.round(containerWidth / 4) - 37;
    }
    this.setGrid(filmBoxes, width, containerWidth, 0, 0);
  }

  setByDatesGridPositions(filmBoxes: FilmBox[]) {
    let startLeft = 300;
    let startTop = 0;

    const containerWidth = window.innerWidth;
    const maxContainerWidth = containerWidth - startLeft;

    let width = 390;
    if (containerWidth <= 768) {
      width = containerWidth - 28;
      startLeft = 0;
      startTop = 180;
      if (this.calendarDatesRow > 4) {
        startTop = 225;
      }
    } else if (containerWidth <= 1050) {
      width = maxContainerWidth - 75;
    } else if (containerWidth <= 1320) {
      width = Math.round(maxContainerWidth / 2) - 50;
    } else {
      width = Math.round(maxContainerWidth / 3) - 40;
    }

    this.setGrid(filmBoxes, width, containerWidth, startLeft, startTop);
  }

  private setGrid(
    filmBoxes: FilmBox[],
    width: number,
    containerWidth: number,
    startLeft: number,
    startTop: number
  ) {
    const padding = 25;

    let left = startLeft;
    let top = startTop;
    for (let i = 0, len = filmBoxes.length; i < len; i++) {
      const filmBox = filmBoxes[i];
      if (filmBox.isDisplayed) {
        filmBox.width = width;
        filmBox.left = left;
        filmBox.top = top;
        left += width + padding;
        if (left + width > containerWidth) {
          left = startLeft;
          top += 250;
        }
      }
    }
  }
}
