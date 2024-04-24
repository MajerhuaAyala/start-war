import { FilmRepository } from "../../domain/FilmRepository";
import { PaginateDto } from "../../domain/adapter/paginate.dto";
import { Either } from "../../../../shared/domain/either";
import { ApiError } from "../../../../shared/domain/type-error";
import { ResponsePaginateFilm } from "../../domain/adapter/responsePaginateFilm";
import { FilmExternalApiRepository } from "../../domain/FilmExternalApiRepository";
import { FilmTitle } from "../../domain/FilmTitle";

export class FilmFilter {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly filmExternalRepository: FilmExternalApiRepository,
  ) {}

  async run(
    criteria: PaginateDto,
  ): Promise<Either<ApiError, ResponsePaginateFilm>> {
    let response = await this.filmRepository.filter(criteria);

    if (criteria.query && response.data.length === 0) {
      const responseExternal = await this.filmExternalRepository.findByTitle(
        new FilmTitle(criteria.query),
      );

      if (responseExternal.length > 0) {
        await this.filmRepository.createBulk(responseExternal);
        response = await this.filmRepository.filter(criteria);
      }
    }

    return Either.right(response);
  }
}
