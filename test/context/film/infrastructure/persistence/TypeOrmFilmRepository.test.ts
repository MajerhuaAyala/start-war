import {
  TypeOrmFilmRepository
} from "../../../../../src/context/film/infrastructure/persistence/TypeOrmFilmRepository";
import {
  TypeOrmClientFactory
} from "../../../../../src/shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import {FilmMother} from "../../domain/FilmMother";

import env from "../../../../../env.dev.json";
import {TypeOrmConfig} from "../../../../../src/shared/infrastructure/persistence/typeorm/TypeOrmConfig";
import {PaginateDto} from "../../../../../src/context/film/domain/adapter/paginate.dto";
import {FilmIdMother} from "../../domain/FilmIdMother";


const typeOrmConfigTest: TypeOrmConfig = {
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
}

const typeOrmFilmRepository = new TypeOrmFilmRepository(
  TypeOrmClientFactory.createClient(typeOrmConfigTest)
)

afterAll(async () => {
  await typeOrmFilmRepository.close()
})

describe("FilmFactory", () => {
  describe("#create", () => {
    it("Debería guardar una película", async () => {
      const filmRandom = FilmMother.random()
      await typeOrmFilmRepository.create(filmRandom)
    })
  })

  describe("#filter", () => {
    it("Debería devolver un listado de películas", async () => {
      const critea: PaginateDto = {
        perPage: 1,
        page: 2,
        query: "a"
      }
      const filmsFound = await typeOrmFilmRepository.filter(critea)
      expect(filmsFound).toBeTruthy()
    })
  })

  describe("#createBulk", () => {
    it("Debería guardar multiples films", async () => {
      const films = [FilmMother.random(), FilmMother.random()]
      await typeOrmFilmRepository.createBulk(films)
    })
  })

  describe("#findById", () => {
    it("Debería recuperar un film", async () => {
      const filmId = FilmIdMother.random()
      const filmFound = await typeOrmFilmRepository.findById(filmId)
      expect(filmFound).toBeTruthy()
    })
  })
})