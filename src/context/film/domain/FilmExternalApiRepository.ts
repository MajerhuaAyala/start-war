import { FilmTitle } from "./FilmTitle";
import { Film } from "./Film";

export interface FilmExternalApiRepository {
  findByTitle(name: FilmTitle): Promise<Film[] | []>;
}
