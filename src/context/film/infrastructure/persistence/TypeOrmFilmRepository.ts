import { TypeOrmRepository } from "../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { FilmEntity } from "./typeorm/film.entity";
import { FilmRepository } from "../../domain/FilmRepository";
import { Film } from "../../domain/Film";
import { FilmId } from "../../domain/FilmId";
import { FilmTitle } from "../../domain/FilmTitle";
import { FilmEpisode } from "../../domain/FilmEpisode";
import { FilmOpeningCrawl } from "../../domain/FilmOpeningCrawl";
import { FilmDirector } from "../../domain/FilmDirector";
import { PaginateDto } from "../../domain/adapter/paginate.dto";
import { ResponsePaginateFilm } from "../../domain/adapter/responsePaginateFilm";

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
        apertura: film.apertura.value,
        director: film.director.value,
      });

      return new Film(
        new FilmId(response.id),
        new FilmTitle(response.titulo),
        new FilmEpisode(response.episodio),
        new FilmOpeningCrawl(response.apertura),
        new FilmDirector(response.director),
      );
    } catch (e) {
      console.error(e);
      throw new Error("Error en la base de datos");
    }
  }

  async filter(criteria: PaginateDto): Promise<ResponsePaginateFilm> {
    try {
      const perPage = criteria.perPage || 0;
      const page = criteria.page || 0;
      const query = criteria.query;

      const skip = (page - 1) * perPage;
      const take = perPage;

      const queryBuilder = (
        await this.repository(FilmEntity)
      ).createQueryBuilder("film");

      if (query) {
        queryBuilder.where("film.titulo LIKE :title", { title: `%${query}%` });
      }

      const total = await queryBuilder
        .orderBy("film.creado", "DESC")
        .getCount();

      const response = await queryBuilder.take(take).skip(skip).getMany();

      const data = response.map(
        (film) =>
          new Film(
            new FilmId(film.id),
            new FilmTitle(film.titulo),
            new FilmEpisode(film.episodio),
            new FilmOpeningCrawl(film.apertura),
            new FilmDirector(film.director),
          ),
      );

      let pages = Math.ceil(total / perPage);

      return {
        data,
        page,
        perPage,
        total,
        pages,
      };
    } catch (e) {
      console.error(e);
      throw new Error("Error en la base de datos");
    }
  }
}
