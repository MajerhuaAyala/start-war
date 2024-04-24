import {FilmEpisode} from "../../../../src/context/film/domain/FilmEpisode";
import {MotherCreator} from "../../../shared/domain/MotherCreator";

export class FilmEpisodeMother {
  static create(value: number) {
    return new FilmEpisode(value)
  }

  static random(): FilmEpisode {
    const episodeRandom = MotherCreator.random().number.int({min: 1, max: 10})
    return this.create(episodeRandom)
  }

  static invalid(): string {
    return "10998"
  }
}