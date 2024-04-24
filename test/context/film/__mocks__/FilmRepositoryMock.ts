import {FilmRepository} from "../../../../src/context/film/domain/FilmRepository";
import {Film} from "../../../../src/context/film/domain/Film";
import {PaginateDto} from "../../../../src/context/film/domain/adapter/paginate.dto";
import {ResponsePaginateFilm} from "../../../../src/context/film/domain/adapter/responsePaginateFilm";
import {FilmId} from "../../../../src/context/film/domain/FilmId";
import {Optional} from "../../../../src/shared/domain/optional";

export class FilmRepositoryMock implements FilmRepository {

  private readonly createMock: jest.Mock
  private readonly createBulkMock: jest.Mock
  private readonly filterMock: jest.Mock
  private readonly findByIdMock: jest.Mock
  private film: Film
  private responsePaginateFilm: ResponsePaginateFilm
  private optionaFilm: Optional<Film>

  constructor() {
    this.createMock = jest.fn()
    this.createBulkMock = jest.fn()
    this.filterMock = jest.fn()
    this.findByIdMock = jest.fn()
  }

  async create(film: Film): Promise<Film> {
    this.createMock(film)
    this.film = film
    return this.film
  }

  async createBulk(films: Film[]): Promise<void> {
    this.createBulkMock(films)
  }

  async filter(criteria: PaginateDto): Promise<ResponsePaginateFilm> {
    this.filterMock(criteria)
    return this.responsePaginateFilm
  }

  async findById(id: FilmId): Promise<Optional<Film>> {
    this.findByIdMock(id)
    return this.optionaFilm
  }

  returnOnFindById(film: Film) {
    this.optionaFilm = Optional.of(film)
  }

  returnOnFindByIdEmpty() {
    this.optionaFilm = Optional.empty()
  }

  assertSaveHaveBeenCalledWith(expected: Film): void {
    expect(this.createMock).toHaveBeenCalledWith(expected)
  }
}