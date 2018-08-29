import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GenreDisplayPipe } from '../../pipes/genre-display.pipe';
import { SafePipe } from '../../pipes/safe.pipe';
import { TimesPipe } from '../../pipes/times.pipe';
import { TrimLengthPipe } from '../../pipes/trim-length.pipe';
import { CalendarComponent } from '../calendar/calendar.component';
import { EleventComponent } from '../elevent/elevent.component';
import { FilmBoxComponent } from '../film-box/film-box.component';
import { FilmDetailComponent } from '../film-detail/film-detail.component';
import { YouTubeComponent } from '../you-tube/you-tube.component';
import { FilmListComponent } from './film-list.component';

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilmListComponent,
        FilmBoxComponent,
        CalendarComponent,
        FilmDetailComponent,
        EleventComponent,
        TrimLengthPipe,
        GenreDisplayPipe,
        YouTubeComponent,
        TimesPipe,
        SafePipe
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
