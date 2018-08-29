import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EleventComponent } from './components/elevent/elevent.component';
import { FilmBoxComponent } from './components/film-box/film-box.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { YouTubeComponent } from './components/you-tube/you-tube.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { OverlayComponent } from './layouts/overlay/overlay.component';
import { GenreDisplayPipe } from './pipes/genre-display.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TimesPipe } from './pipes/times.pipe';
import { TrimLengthPipe } from './pipes/trim-length.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [
        AppComponent,
        MenuComponent,
        OverlayComponent,
        FilmListComponent,
        HeaderComponent,
        CalendarComponent,
        FilmBoxComponent,
        EleventComponent,
        YouTubeComponent,
        SafePipe,
        TrimLengthPipe,
        TimesPipe,
        GenreDisplayPipe,
        FilmDetailComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
