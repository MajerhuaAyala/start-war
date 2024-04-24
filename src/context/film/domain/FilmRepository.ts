import { Film } from "./Film";
import { PaginateDto } from "./adapter/paginate.dto";
import { ResponsePaginateFilm } from "./adapter/responsePaginateFilm";
import { FilmId } from "./FilmId";
import { Optional } from "../../../shared/domain/optional";

export interface FilmRepository {
  create(film: Film): Promise<Film>;

  createBulk(films: Film[]): Promise<void>;

  filter(criteria: PaginateDto): Promise<ResponsePaginateFilm>;

  findById(id: FilmId): Promise<Optional<Film>>;
}
