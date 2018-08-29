import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatesPageComponent } from './pages/dates-page/dates-page.component';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'films',
    component: HomePageComponent
  },
  {
    path: 'dates',
    component: DatesPageComponent
  },
  {
    path: 'dates/:date',
    component: DatesPageComponent
  },
  {
    path: 'film/:name',
    component: FilmPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
