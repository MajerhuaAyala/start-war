import {SwapiConfig} from "../../../../../src/shared/infrastructure/externalApi/swapi/SwapiConfig";
import env from "../../../../../env.dev.json";
import {SwapiFilmRepository} from "../../../../../src/context/film/infrastructure/externalApi/SwapiFilmRepository";
import {SwapiClientFactory} from "../../../../../src/shared/infrastructure/externalApi/swapi/SwapiClientFactory";
import {FilmTitleMother} from "../../domain/FilmTitleMother";

const swapiConfigTest: SwapiConfig = {
  url: env.SWAPI_BASE_URL
}

const swapiFilmRepository = new SwapiFilmRepository(
  SwapiClientFactory.createClient(swapiConfigTest)
)

describe("#findByTitle", () => {
  it("Debería devolver un listado de películas", async () => {
    const filmTitleRandom = FilmTitleMother.random()
    const responseApi = await swapiFilmRepository.findByTitle(filmTitleRandom)
    expect(responseApi).toBeTruthy()
  })
})