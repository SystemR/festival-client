import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FilmBox } from '../../models/film-box';
import { ActiveFilmService } from '../../services/active-film.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
  activeFilmBox: FilmBox;
  currentFilmImage: string;
  overlayContainerHeight: string;

  activeFilmChanges$: Subscription;

  constructor(private activeFilmService: ActiveFilmService) {}

  ngOnInit() {
    this.activeFilmChanges$ = this.activeFilmService.changes.subscribe(activeFilmBox => {
      this.toggleDisplay(activeFilmBox);
    });
  }

  ngOnDestroy() {
    this.activeFilmChanges$.unsubscribe();
  }

  toggleDisplay(activeFilmBox: FilmBox) {
    this.activeFilmBox = activeFilmBox;
    if (activeFilmBox) {
      this.currentFilmImage = `url(${environment.staticAssetUrl}${this.activeFilmBox.film.img})`;
    } else {
      this.currentFilmImage = null;
    }
  }

  close() {
    this.activeFilmService.clearActive();
  }
}
