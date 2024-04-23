import { Request, Response } from "lambda-api";
import { TypeOrmFilmRepository } from "../persistence/TypeOrmFilmRepository";
import { TypeOrmClientFactory } from "../../../../shared/infrastructure/persistence/typeorm/type-orm-client-factory";
import { TypeOrmConfigFactory } from "../../../shared/infrastructure/persistence/typeorm/type-orm-config-factory";
import { FilmCreator } from "../../application/create/FilmCreator";

export const createFilm = async (req: Request, res: Response) => {
  try {
    const filmRepository = new TypeOrmFilmRepository(
      TypeOrmClientFactory.createClient(TypeOrmConfigFactory.createConfig()),
    );
    const filmCreator = new FilmCreator(filmRepository);
    return filmCreator.run(req.body);
  } catch (error) {
    console.error(error);
    throw new Error("salio mal");
  }
};
