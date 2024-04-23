import { FilmRepository } from "../../domain/FilmRepository";
import { Film } from "../../domain/Film";
import { FilmId } from "../../domain/FilmId";
import { FilmTitle } from "../../domain/FilmTitle";
import { FilmEpisode } from "../../domain/FilmEpisode";
import { FilmOpeningCrawl } from "../../domain/FilmOpeningCrawl";
import { FilmDirector } from "../../domain/FilmDirector";

export class FilmCreator {
  constructor(private readonly filmRepository: FilmRepository) {}

  async run(params: {
    id: string;
    titulo: string;
    episodio: number;
    apertura: string;
    director: string;
  }): Promise<Film> {
    const newFilm = new Film(
      new FilmId(params.id),
      new FilmTitle(params.titulo),
      new FilmEpisode(params.episodio),
      new FilmOpeningCrawl(params.apertura),
      new FilmDirector(params.director),
    );
    return this.filmRepository.create(newFilm);
  }
}
