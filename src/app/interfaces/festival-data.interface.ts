import { Film } from '../models/film';
import { FilmDate } from '../models/film-date';

/**
 * The data structure when the client retrieves festival data
 */
export interface FestivalData {
  films: Film[];
  filmDates: FilmDate[];
}
