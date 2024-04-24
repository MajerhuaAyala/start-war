import {FilmId} from "./FilmId";
import {FilmTitle} from "./FilmTitle";
import {FilmEpisode} from "./FilmEpisode";
import {FilmOpeningCrawl} from "./FilmOpeningCrawl";
import {FilmDirector} from "./FilmDirector";

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

  static fromEnglishAttribute(plainDate: {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string
  }): Film {
    return new Film(
      new FilmId(this.generateRandomId()),
      new FilmTitle(plainDate.title),
      new FilmEpisode(plainDate.episode_id),
      new FilmOpeningCrawl(plainDate.opening_crawl),
      new FilmDirector(plainDate.director)
    )
  }

  static generateRandomId() {
    return `film-${Date.now()}`
  }
}
