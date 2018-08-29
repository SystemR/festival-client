import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { FestivalData } from './app/interfaces/festival-data.interface';
import { SessionDataService } from './app/services/session-data.service';
import { ImageLoader } from './app/utilities/image-loader';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;

// Fetch data
fetch(`${apiUrl}festival/${apiKey}`)
  .then((res: Response) => {
    return res.json();
  })
  .then(onDataReady);

function onDataReady(res: FestivalData) {
  const staticAssetUrl = environment.staticAssetUrl;
  const films = res.films;
  const filmDates = res.filmDates;

  // Store for the session
  const sessionDataService = new SessionDataService();
  sessionDataService.setData(films, filmDates);

  const loadImagePromises = [];
  films.forEach(film => {
    const imgSrc = `${staticAssetUrl}${film.img}`;
    const imageLoader = new ImageLoader();
    loadImagePromises.push(imageLoader.load(imgSrc));
  });

  Promise.all(loadImagePromises).then(onImagesLoaded, _ => {});
}

function onImagesLoaded() {
  // Start Angular App once ready
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
