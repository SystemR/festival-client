import { TestBed, inject } from '@angular/core/testing';

import { FilmDisplayService } from './film-display.service';

describe('FilmDisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmDisplayService]
    });
  });

  it('should be created', inject([FilmDisplayService], (service: FilmDisplayService) => {
    expect(service).toBeTruthy();
  }));
});
