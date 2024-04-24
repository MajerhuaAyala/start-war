import { Request, Response } from "lambda-api";
import { TypeOrmFilmRepository } from "../persistence/TypeOrmFilmRepository";
import { TypeOrmClientFactory } from "../../../../shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { TypeOrmConfigFactory } from "../../../shared/infrastructure/persistence/typeorm/TypeOrmConfigFactory";
import { FilmCreator } from "../../application/create/FilmCreator";
import { ApiResponse } from "../../../../shared/infrastructure/api-response";
import { STATUS_CODE } from "../../../../shared/domain/type-error";

export const createFilmController = async (req: Request, res: Response) => {
  try {
    const filmRepository = new TypeOrmFilmRepository(
      TypeOrmClientFactory.createClient(TypeOrmConfigFactory.createConfig()),
    );
    const filmCreator = new FilmCreator(filmRepository);
    const response = await filmCreator.run(req.body);

    await filmRepository.close();

    return response.fold(
      (error) => {
        return ApiResponse.builder()
          .setStatusCode(error.status)
          .setObjectBody(error.message)
          .setResponseApi(res)
          .build()
          .getResponse();
      },
      (response) =>
        ApiResponse.builder()
          .setStatusCode(STATUS_CODE.OK)
          .setObjectBody(response)
          .setResponseApi(res)
          .build()
          .getResponse(),
    );
  } catch (error) {
    console.error(`${createFilmController.name}: `, error);
    return (
      ApiResponse.builder()
        .setStatusCode(STATUS_CODE.INTERNAL_SERVER_ERROR)
        // @ts-ignore
        .setObjectBody(error.message)
        .build()
    );
  }
};
