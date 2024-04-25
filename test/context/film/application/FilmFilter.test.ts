import {FilmRepositoryMock} from "../__mocks__/FilmRepositoryMock";
import {FilmFilter} from "../../../../src/context/film/application/get/FilmFilter";
import {FilmExternalRepositoryMock} from "../__mocks__/FilmExternalRepositoryMock";
import {PaginateDto} from "../../../../src/context/film/domain/adapter/paginate.dto";
import {FilmMother} from "../domain/FilmMother";
import {ResponsePaginateFilm} from "../../../../src/context/film/domain/adapter/responsePaginateFilm";
import {Film} from "../../../../src/context/film/domain/Film";

let filmRepository: FilmRepositoryMock
let filmExternalRepository: FilmExternalRepositoryMock
let filmFilter: FilmFilter

beforeAll(() => {
  filmRepository = new FilmRepositoryMock()
  filmExternalRepository = new FilmExternalRepositoryMock()
  filmFilter = new FilmFilter(filmRepository, filmExternalRepository)
})

describe("Filtrar películas", () => {
  describe("El título de la pélicula existe y ya está registrado en la base de datos", () => {
    it("Debería devolve un paginado de Films, con page, perPage y total", async () => {
      const criteria: PaginateDto = {
        query: "a",
        page: 1,
        perPage: 10
      }

      const films = [FilmMother.random(), FilmMother.random(), FilmMother.random()]
      const page = 1
      const perPage = 2
      const total = films.length

      filmRepository.returnOnFilter(films, page, perPage, total)

      const response = await filmFilter.run(criteria)

      const responseService: ResponsePaginateFilm = {
        total,
        perPage,
        pages: Math.ceil(total / perPage),
        page,
        data: films
      }
      expect(response.getRight()).toMatchObject(responseService)
    })
  })

  describe("El título de película no está registrado en la base de datos pero si existe en la api SWAPI", () => {
    it("Debería consultar a la API de SWAPI y paginar los films", async () => {
      const criteria: PaginateDto = {
        query: "a",
        page: 1,
        perPage: 10
      }

      const films: Film[] = []
      const filmsReturnRepositoryExternal = [FilmMother.random(), FilmMother.random()]

      const page = 1
      const perPage = 2
      const total = filmsReturnRepositoryExternal.length

      filmRepository.returnOnFilter(films, page, perPage, total)
      filmExternalRepository.returnOnFindByTitle(filmsReturnRepositoryExternal)
      filmRepository.returnOnCreateBulk(filmsReturnRepositoryExternal, page, perPage, total)

      const response = await filmFilter.run(criteria)

      const responseService: ResponsePaginateFilm = {
        total,
        perPage,
        pages: Math.ceil(total / perPage),
        page,
        data: filmsReturnRepositoryExternal
      }

      expect(response.getRight()).toMatchObject(responseService)

    })
  })

  describe("El título de la pelcula no está registrado en la base de datos y no existe en api SWAPI", () => {
    it("Debería de devolver un paginado con datos vacios", async () => {
      const criteria: PaginateDto = {
        query: "auahsdh18238",
        page: 1,
        perPage: 10
      }

      const films: Film[] = []
      const filmsReturnRepositoryExternal: Film[] = []

      const page = 1
      const perPage = 2
      const total = filmsReturnRepositoryExternal.length

      filmRepository.returnOnFilter(films, page, perPage, total)
      filmExternalRepository.returnOnFindByTitle(filmsReturnRepositoryExternal)
      filmRepository.returnOnCreateBulk(filmsReturnRepositoryExternal, page, perPage, total)

      const response = await filmFilter.run(criteria)

      const responseService: ResponsePaginateFilm = {
        total,
        perPage,
        pages: Math.ceil(total / perPage),
        page,
        data: filmsReturnRepositoryExternal
      }

      expect(response.getRight()).toMatchObject(responseService)
    })
  })
})
