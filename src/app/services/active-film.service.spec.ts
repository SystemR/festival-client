import { TestBed, inject } from '@angular/core/testing';

import { ActiveFilmService } from './active-film.service';

describe('ActiveFilmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveFilmService]
    });
  });

  it('should be created', inject([ActiveFilmService], (service: ActiveFilmService) => {
    expect(service).toBeTruthy();
  }));
});
