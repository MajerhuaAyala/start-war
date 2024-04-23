import { API } from "lambda-api";
import { CreateFilm } from "../controller/CreateFilm";
const createFilmController = new CreateFilm();

const filmRoutes = (api: API): void => {
  api.post("/create", createFilmController.run);
};

export default filmRoutes;
