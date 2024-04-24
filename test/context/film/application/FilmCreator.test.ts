import {FilmRepositoryMock} from "../__mocks__/FilmRepositoryMock";
import {FilmCreator} from "../../../../src/context/film/application/create/FilmCreator";
import {FilmMother} from "../domain/FilmMother";

let filmRepository: FilmRepositoryMock
let filmCreator: FilmCreator

beforeAll(() => {
  filmRepository = new FilmRepositoryMock()
  filmCreator = new FilmCreator(filmRepository)
})

describe("Crear nueva pelicula", () => {
  describe("La pelicula no está registrado en la base de datos", () => {
    describe("Todo los atributos del personaje están correctos", () => {
      it("Debería registrar en la base de datos y devovler la película", async () => {
        const newFilmRandom = FilmMother.random()

        filmRepository.returnOnFindByIdEmpty()

        const response = await filmCreator.run({
          id: newFilmRandom.id.value,
          apertura: newFilmRandom.apertura.value,
          director: newFilmRandom.director.value,
          episodio: newFilmRandom.episodio.value,
          titulo: newFilmRandom.titulo.value
        })

        filmRepository.assertSaveHaveBeenCalledWith(newFilmRandom)

        expect(response.getRight()).toMatchObject(newFilmRandom)
      })
    })
  })
})