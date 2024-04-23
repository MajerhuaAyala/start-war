import { FilmRepository } from "../../domain/FilmRepository";
import { PaginateDto } from "../../domain/adapter/paginate.dto";
import { Either } from "../../../../shared/domain/either";
import { ApiError } from "../../../../shared/domain/type-error";
import { ResponsePaginateFilm } from "../../domain/adapter/responsePaginateFilm";

export class FilmFilter {
  constructor(private readonly filmRepository: FilmRepository) {}

  async run(
    criteria: PaginateDto,
  ): Promise<Either<ApiError, ResponsePaginateFilm>> {
    const response = await this.filmRepository.filter(criteria);
    return Either.right(response);
  }
}
