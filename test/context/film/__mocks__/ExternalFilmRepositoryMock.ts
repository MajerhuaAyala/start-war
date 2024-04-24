import {FilmExternalApiRepository} from "../../../../src/context/film/domain/FilmExternalApiRepository";
import {FilmTitle} from "../../../../src/context/film/domain/FilmTitle";
import {Film} from "../../../../src/context/film/domain/Film";

export class ExternalFilmRepositoryMock implements FilmExternalApiRepository {
  private readonly findByTitleMock: jest.Mock
  private person: Film[] | []

  constructor() {
    this.findByTitleMock = jest.fn()
  }

  async findByTitle(name: FilmTitle): Promise<Film[] | []> {
    this.findByTitleMock(name)
    return this.person
  }
}