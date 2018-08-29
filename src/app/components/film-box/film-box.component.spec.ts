import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Film } from '../../models/film';
import { FilmBox } from '../../models/film-box';
import { GenreDisplayPipe } from '../../pipes/genre-display.pipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { TimesPipe } from '../../pipes/times.pipe';
import { TrimLengthPipe } from '../../pipes/trim-length.pipe';
import { EleventComponent } from '../elevent/elevent.component';
import { FilmDetailComponent } from '../film-detail/film-detail.component';
import { YouTubeComponent } from '../you-tube/you-tube.component';
import { FilmBoxComponent } from './film-box.component';

describe('FilmBoxComponent', () => {
  let component: FilmBoxComponent;
  let fixture: ComponentFixture<FilmBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilmBoxComponent,
        TrimLengthPipe,
        EleventComponent,
        FilmDetailComponent,
        SafePipe,
        YouTubeComponent,
        GenreDisplayPipe,
        TimesPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmBoxComponent);
    component = fixture.componentInstance;
    const filmBox = new FilmBox();
    const film = new Film();
    filmBox.film = film;
    component.filmBox = filmBox;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
