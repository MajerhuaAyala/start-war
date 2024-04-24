import { FilmRepository } from "../../domain/FilmRepository";
import { Film } from "../../domain/Film";
import { FilmId } from "../../domain/FilmId";
import { FilmTitle } from "../../domain/FilmTitle";
import { FilmEpisode } from "../../domain/FilmEpisode";
import { FilmOpeningCrawl } from "../../domain/FilmOpeningCrawl";
import { FilmDirector } from "../../domain/FilmDirector";
import { Either } from "../../../../shared/domain/either";
import {
  ApiError,
  BadRequestError,
} from "../../../../shared/domain/type-error";

export class FilmCreator {
  constructor(private readonly filmRepository: FilmRepository) {}

  async run(params: {
    id: string;
    titulo: string;
    episodio: number;
    apertura: string;
    director: string;
  }): Promise<Either<ApiError, Film>> {
    const filmFound = await this.filmRepository.findById(new FilmId(params.id));

    if (filmFound.isPresent()) {
      return Either.left(
        new BadRequestError(
          `La película con el id: ${params.id} ya está registrada.`,
        ),
      );
    }

    const newFilm = new Film(
      new FilmId(params.id),
      new FilmTitle(params.titulo),
      new FilmEpisode(params.episodio),
      new FilmOpeningCrawl(params.apertura),
      new FilmDirector(params.director),
    );

    const response = await this.filmRepository.create(newFilm);
    return Either.right(response);
  }
}
