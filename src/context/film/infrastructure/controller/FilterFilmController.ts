import { TypeOrmFilmRepository } from "../persistence/TypeOrmFilmRepository";
import { TypeOrmClientFactory } from "../../../../shared/infrastructure/persistence/typeorm/type-orm-client-factory";
import { TypeOrmConfigFactory } from "../../../shared/infrastructure/persistence/typeorm/type-orm-config-factory";
import { ApiResponse } from "../../../../shared/infrastructure/api-response";
import { STATUS_CODE } from "../../../../shared/domain/type-error";
import { FilmFilter } from "../../application/get/FilmFilter";
import { Request, Response } from "lambda-api";
import { PaginateDto } from "../../domain/adapter/paginate.dto";

export const filterFilmController = async (req: Request, res: Response) => {
  try {
    const { page, perPage, query } = req.query as PaginateDto;

    const filmRepository = new TypeOrmFilmRepository(
      TypeOrmClientFactory.createClient(TypeOrmConfigFactory.createConfig()),
    );

    const filmFilter = new FilmFilter(filmRepository);

    const response = await filmFilter.run({ page, perPage, query });

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
        .setObjectBody(e.message)
        .build()
    );
  }
};
