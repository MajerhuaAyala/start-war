import { Film } from "../Film";

export interface ResponsePaginateFilm {
  page: number;
  perPage: number;
  pages: number;
  data: Film[];
  total: number;
}
