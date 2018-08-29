import { Component, OnInit } from '@angular/core';

import { FilmDisplayService } from '../../services/film-display.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  searchString: string;

  constructor(private filmService: FilmDisplayService) {}

  ngOnInit() {}

  search(searchString: string) {
    this.filmService.setSearchFilter(searchString);
  }
}
