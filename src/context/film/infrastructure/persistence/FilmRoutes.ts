import { API } from "lambda-api";
import { createFilm } from "../controller/CreateFilm";

const filmRoutes = (api: API): void => {
  api.post("/create", createFilm);
};

export default filmRoutes;
