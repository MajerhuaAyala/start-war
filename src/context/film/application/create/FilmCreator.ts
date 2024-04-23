import { FilmRepository } from "../../domain/FilmRepository";
import { Film } from "../../domain/Film";
import { FilmId } from "../../domain/FilmId";
import { FilmTitle } from "../../domain/FilmTitle";
import { FilmEpisode } from "../../domain/FilmEpisode";

export class FilmCreator {
  constructor(private readonly filmRepository: FilmRepository) {}

  async run(params: {
    id: string;
    titulo: string;
    episodio: number;
  }): Promise<Film> {
    const newFilm = new Film(
      new FilmId(params.id),
      new FilmTitle(params.titulo),
      new FilmEpisode(params.episodio),
    );
    return this.filmRepository.create(newFilm);
  }
}
