import {FilmRepositoryMock} from "../__mocks__/FilmRepositoryMock";
import {FilmCreator} from "../../../../src/context/film/application/create/FilmCreator";
import {FilmMother} from "../domain/FilmMother";
import {BadRequestError} from "../../../../src/shared/domain/type-error";

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

    describe("El titulo de la pelula está es vacia", () => {
      it("Debería devolve una excepcion con el mensaje de Formato del campo titulo es invalida", async () => {
        const newFilmRandom = FilmMother.random() // se crea un film con atributos random
        filmRepository.returnOnFindByIdEmpty() // el medoto de findById del repositorio devolverá un Optional.empty() que significa que no hay un fil registrado con el mismo id
        await expect(filmCreator.run({
          id: newFilmRandom.id.value,
          apertura: newFilmRandom.apertura.value,
          director: newFilmRandom.director.value,
          episodio: newFilmRandom.episodio.value,
          titulo: `${newFilmRandom.titulo.value}-**` // lo valores ** no cumplen con el formato de titulo
        })).rejects.toThrow("Formato del campo titulo es invalida")
      })
    })
  })

  describe("La película ya está registrada", () => {
    it("Debería devolver un error con el mensaje de La película con el id: 12345 ya está registrada.", async () => {
      const newFilmRandom = FilmMother.random() // se crea un film con atributos random

      filmRepository.returnOnFindById(newFilmRandom) // le doy la intrucción de que el método findById devuelva un film idéntico al newFilmRandom

      const response = await filmCreator.run({
        id: newFilmRandom.id.value,
        apertura: newFilmRandom.apertura.value,
        director: newFilmRandom.director.value,
        episodio: newFilmRandom.episodio.value,
        titulo: newFilmRandom.titulo.value
      })

      expect(response.getLeft()).toMatchObject(new BadRequestError(`La película con el id: ${newFilmRandom.id.value} ya está registrada.`))

    })
  })

})