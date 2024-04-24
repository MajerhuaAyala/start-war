import { FilmId } from "./FilmId";
import { FilmTitle } from "./FilmTitle";
import { FilmEpisode } from "./FilmEpisode";
import { FilmOpeningCrawl } from "./FilmOpeningCrawl";
import { FilmDirector } from "./FilmDirector";
import { v4 as uuidv4 } from "uuid";

interface FilmPrimitive {
  id?: string;
  titulo: string;
  episodio: number;
  apertura: string;
  director: string;
}

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
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
  }): Film {
    return new Film(
      new FilmId(this.generateRandomId()),
      new FilmTitle(plainDate.title),
      new FilmEpisode(plainDate.episode_id),
      new FilmOpeningCrawl(plainDate.opening_crawl),
      new FilmDirector(plainDate.director),
    );
  }

  toPrimitive(): FilmPrimitive {
    return {
      id: this.id.value,
      apertura: this.apertura.value,
      director: this.director.value,
      episodio: this.episodio.value,
      titulo: this.titulo.value,
    };
  }

  static generateRandomId() {
    return uuidv4();
  }
}
