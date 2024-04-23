import { FilmId } from "./FilmId";
import { FilmTitle } from "./FilmTitle";
import { FilmEpisode } from "./FilmEpisode";
import { FilmOpeningCrawl } from "./FilmOpeningCrawl";
import { FilmDirector } from "./FilmDirector";

export class Film {
  id: FilmId;
  titulo: FilmTitle;
  episodio: FilmEpisode;
  apertura: FilmOpeningCrawl;
  director: FilmDirector;

  constructor(
    id: FilmId,
    titulo: FilmTitle,
    episodio: FilmEpisode,
    apertura: FilmOpeningCrawl,
    director: FilmDirector,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.episodio = episodio;
    this.apertura = apertura;
    this.director = director;
  }
}
