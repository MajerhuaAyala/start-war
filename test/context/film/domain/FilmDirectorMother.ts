import {FilmDirector} from "../../../../src/context/film/domain/FilmDirector";
import {MotherCreator} from "../../../shared/domain/MotherCreator";

export class FilmDirectorMother {
  static create(value: string) {
    return new FilmDirector(value)
  }

  static random(): FilmDirector {
    const randomName = MotherCreator.random().person.firstName()
    return this.create(randomName)
  }
}