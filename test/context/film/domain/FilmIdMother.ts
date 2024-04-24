import {FilmId} from "../../../../src/context/film/domain/FilmId";
import {MotherCreator} from "../../../shared/domain/MotherCreator";

export class FilmIdMother {
  static create(value: string) {
    return new FilmId(value)
  }

  static random(): FilmId {
    const randomUuid = MotherCreator.random().string.uuid()
    return this.create(randomUuid)
  }
}