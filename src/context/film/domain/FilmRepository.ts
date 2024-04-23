import { Film } from "./Film";

export interface FilmRepository {
  create(film: Film): Promise<Film>;
}
