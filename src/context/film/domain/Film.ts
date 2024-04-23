import { FilmId } from "./FilmId";
import { FilmTitle } from "./FilmTitle";
import { FilmEpisode } from "./FilmEpisode";

export class Film {
  id: FilmId;
  titulo: FilmTitle;
  episodio: FilmEpisode;

  constructor(id: FilmId, titulo: FilmTitle, episodio: FilmEpisode) {
    this.id = id;
    this.titulo = titulo;
    this.episodio = episodio;
  }
}
