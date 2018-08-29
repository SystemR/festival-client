import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Film } from '../../models/film';
import { GenreDisplayPipe } from '../../pipes/genre-display.pipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { TimesPipe } from '../../pipes/times.pipe';
import { YouTubeComponent } from '../you-tube/you-tube.component';
import { FilmDetailComponent } from './film-detail.component';

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilmDetailComponent, YouTubeComponent, GenreDisplayPipe, TimesPipe, SafePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    const film = new Film();
    component.film = film;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
