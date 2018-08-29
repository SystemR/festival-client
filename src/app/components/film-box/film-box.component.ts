import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Film } from '../../models/film';
import { FilmBox } from '../../models/film-box';
import { FilmDate } from '../../models/film-date';
import { ActiveFilmService } from '../../services/active-film.service';
import { FilmDisplayService } from '../../services/film-display.service';

@Component({
  selector: 'app-film-box',
  templateUrl: './film-box.component.html',
  styleUrls: ['./film-box.component.scss']
})
export class FilmBoxComponent implements OnInit, OnChanges {
  @Input()
  filmBox: FilmBox;

  @Input()
  animStep: number;

  @Output()
  select = new EventEmitter<FilmBox>();

  // States
  @HostBinding('class.expanded')
  @Input()
  isExpanded = false;
  isShowingTicketPage = false;
  isElevantLoaded = false;

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.top')
  top: string;

  @HostBinding('style.left')
  left: string;

  film: Film;
  filmDates: FilmDate[];
  styleImg: string;

  constructor(
    private activeFilmService: ActiveFilmService,
    private filmService: FilmDisplayService
  ) {}

  ngOnInit() {
    const filmBox = this.filmBox;
    const film = filmBox.film;
    this.film = film;
    this.styleImg = `url(${environment.staticAssetUrl}${film.img})`;
    this.filmDates = this.filmService.getDatesByFilmName(film.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.animStep) {
      requestAnimationFrame(() => {
        const filmBox = this.filmBox;
        this.width = filmBox.width + 'px';
        this.top = filmBox.top + 'px';
        this.left = filmBox.left + 'px';

        const film = filmBox.film;
        this.film = film;
      });
    }
  }

  showTicketPage() {
    this.isShowingTicketPage = true;
    this.isElevantLoaded = false;
  }

  selectBox() {
    this.select.emit(this.filmBox);
  }

  close() {
    this.activeFilmService.clearActive();
  }
}
