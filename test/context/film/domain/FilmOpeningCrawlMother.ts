import {FilmOpeningCrawl} from "../../../../src/context/film/domain/FilmOpeningCrawl";
import {MotherCreator} from "../../../shared/domain/MotherCreator";

export class FilmOpeningCrawlMother {
  static create(value: string) {
    return new FilmOpeningCrawl(value)
  }

  static random(): FilmOpeningCrawlMother {
    const randomOpening = MotherCreator.random().lorem.paragraphs({min: 2, max: 5})
    return this.create(randomOpening)
  }
}