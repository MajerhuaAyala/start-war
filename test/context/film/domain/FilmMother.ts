import {Film} from "../../../../src/context/film/domain/Film";
import {FilmIdMother} from "./FilmIdMother";
import {FilmTitleMother} from "./FilmTitleMother";
import {FilmEpisodeMother} from "./FilmEpisodeMother";
import {FilmOpeningCrawlMother} from "./FilmOpeningCrawlMother";
import {FilmDirectorMother} from "./FilmDirectorMother";

export class FilmMother {
  static random(): Film {
    return new Film(
      FilmIdMother.random(),
      FilmTitleMother.random(),
      FilmEpisodeMother.random(),
      FilmOpeningCrawlMother.random(),
      FilmDirectorMother.random()
    )
  }
}