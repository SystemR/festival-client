import { Injectable } from '@angular/core';

/**
 * Generates Calendar
 */
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private dates: Array<Array<number>> = [];

  constructor() {
    const dates = [];
    let currentRow = [];

    let daysInFeb = 28;
    let i = 1;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (month === 1 && ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0)) {
      daysInFeb = 29;
    }

    let totalDays = [31, daysInFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let tempDate = new Date(year, month, 1, 0, 0, 0, 0);
    let tempweekday = tempDate.getDay();
    let tempweekday2 = tempweekday;
    let dayAmount = totalDays[month];

    while (tempweekday > 0) {
      currentRow.push(null);
      tempweekday--;
    }

    while (i <= dayAmount) {
      if (tempweekday2 > 6) {
        tempweekday2 = 0;
        dates.push(currentRow);
        currentRow = [];
      }
      currentRow.push(i);
      tempweekday2++;
      i++;
    }

    if (tempweekday2 < 6) {
      for (let j = tempweekday2; j < 7; j++) {
        currentRow.push(null);
      }
    }
    dates.push(currentRow);
    this.dates = dates;
  }

  getDates() {
    return this.dates;
  }

  getDateStringFromDateNum(dateNumber: number) {
    const currentDate = new Date();
    currentDate.setDate(dateNumber);
    return this.getDateString(currentDate);
  }

  getDateString(dateObj: Date) {
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return (
      dateObj.getFullYear() +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date)
    );
  }
}
