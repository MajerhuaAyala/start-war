import { API } from "lambda-api";
import { createFilmController } from "./controller/CreateFilmController";
import { filterFilmController } from "./controller/FilterFilmController";

const filmRoutes = (api: API): void => {
  api.post("/create", createFilmController);
  api.get("/paginate", filterFilmController);
};

export default filmRoutes;
