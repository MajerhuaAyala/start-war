import {SwapiRepository} from "../../../../shared/infrastructure/externalApi/swapi/SwapiRepository";
import {FilmExternalApiRepository} from "../../domain/FilmExternalApiRepository";
import {FilmTitle} from "../../domain/FilmTitle";
import {Film} from "../../domain/Film";

export class SwapiFilmRepository extends SwapiRepository implements FilmExternalApiRepository {
  async findByTitle(name: FilmTitle): Promise<Film[] | []> {
    const responseApi = (await this.filterBy(name.value))?.data?.result || []

    if (!responseApi || responseApi.length === 0) {
      return []
    }

    return responseApi.map((result: {
      title: string;
      director: string;
      opening_crawl: string;
      episode_id: number;
      producer: string;
      release_date: any;
    }) => {
      return Film.fromEnglishAttribute({
        title: result.title,
        director: result.director,
        opening_crawl: result.opening_crawl,
        episode_id: result.episode_id,
        producer: result.producer,
        release_date: result.release_date
      })
    })
  }
}