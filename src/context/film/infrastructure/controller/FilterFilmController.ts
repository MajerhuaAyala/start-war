import { TypeOrmFilmRepository } from "../persistence/TypeOrmFilmRepository";
import { TypeOrmClientFactory } from "../../../../shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { TypeOrmConfigFactory } from "../../../shared/infrastructure/persistence/typeorm/TypeOrmConfigFactory";
import { ApiResponse } from "../../../../shared/infrastructure/api-response";
import { STATUS_CODE } from "../../../../shared/domain/type-error";
import { FilmFilter } from "../../application/get/FilmFilter";
import { Request, Response } from "lambda-api";
import { PaginateDto } from "../../domain/adapter/paginate.dto";
import { SwapiFilmRepository } from "../externalApi/SwapiFilmRepository";
import { SwapiClientFactory } from "../../../../shared/infrastructure/externalApi/swapi/SwapiClientFactory";
import { SwapiConfigFactory } from "../../../shared/infrastructure/externalApi/SwapiConfigFactory";

export const filterFilmController = async (req: Request, res: Response) => {
  try {
    const { page, perPage, query } = req.query as PaginateDto;

    const filmRepository = new TypeOrmFilmRepository(
      TypeOrmClientFactory.createClient(TypeOrmConfigFactory.createConfig()),
    );

    const filmRepositoryExternal = new SwapiFilmRepository(
      SwapiClientFactory.createClient(SwapiConfigFactory.createConfig()),
    );

    const filmFilter = new FilmFilter(filmRepository, filmRepositoryExternal);

    const response = await filmFilter.run({ page, perPage, query });

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
    console.error(`${filterFilmController.name}: `, error);
    return (
      ApiResponse.builder()
        .setStatusCode(STATUS_CODE.INTERNAL_SERVER_ERROR)
        // @ts-ignore
        .setObjectBody(error.message)
        .setResponseApi(res)
        .build()
        .getResponse()
    );
  }
};
