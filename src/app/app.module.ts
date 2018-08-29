import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
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
import { DatesPageComponent } from './pages/dates-page/dates-page.component';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenreDisplayPipe } from './pipes/genre-display.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TimesPipe } from './pipes/times.pipe';
import { TrimLengthPipe } from './pipes/trim-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    MenuComponent,
    FilmListComponent,
    DatesPageComponent,
    TrimLengthPipe,
    FilmBoxComponent,
    CalendarComponent,
    OverlayComponent,
    GenreDisplayPipe,
    SafePipe,
    YouTubeComponent,
    FilmPageComponent,
    FilmDetailComponent,
    TimesPipe,
    EleventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
