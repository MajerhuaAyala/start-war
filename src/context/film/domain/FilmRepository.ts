import { Film } from "./Film";
import { PaginateDto } from "./adapter/paginate.dto";
import { ResponsePaginateFilm } from "./adapter/responsePaginateFilm";

export interface FilmRepository {
  create(film: Film): Promise<Film>;
  filter(criteria: PaginateDto): Promise<ResponsePaginateFilm>;
}
