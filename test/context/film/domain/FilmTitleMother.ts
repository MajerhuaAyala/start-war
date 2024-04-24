import {FilmTitle} from "../../../../src/context/film/domain/FilmTitle";
import {MotherCreator} from "../../../shared/domain/MotherCreator";

export class FilmTitleMother {
  static create(value: string) {
    return new FilmTitle(value)
  }

  static random(): FilmTitleMother {
    const randomTitle = MotherCreator.random().music.songName()
    return this.create(randomTitle)
  }
}