import { TypeOrmRepository } from "../../../../shared/infrastructure/persistence/typeorm/type-orm-repository";
import { FilmEntity } from "./typeorm/film.entity";
import { FilmRepository } from "../../domain/FilmRepository";
import { Film } from "../../domain/Film";
import { FilmId } from "../../domain/FilmId";
import { FilmTitle } from "../../domain/FilmTitle";
import { FilmEpisode } from "../../domain/FilmEpisode";

export class TypeOrmFilmRepository
  extends TypeOrmRepository<FilmEntity>
  implements FilmRepository
{
  async create(film: Film): Promise<Film> {
    try {
      const response = await (
        await this.repository(FilmEntity)
      ).save({
        id: film.id.value,
        episodio: film.episodio.value,
        titulo: film.titulo.value,
      });

      return new Film(
        new FilmId(response.id),
        new FilmTitle(response.titulo),
        new FilmEpisode(response.episodio),
      );
    } catch (e) {
      console.error(e);
      throw new Error("Error en la base de datos");
    }
  }
}
