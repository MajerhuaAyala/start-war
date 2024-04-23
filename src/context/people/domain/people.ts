import { Vehicle } from "../../vehicle/domain/vehicle";
import { Film } from "../../film/domain/Film";

export class People {
  id: string;
  nombre: string;
  peso: number;
  colorPelo: string;
  colorPiel: string;
  colorOjo: string;
  fechaNacimiento: Date;
  genero: string;
  planetaNatal: string;
  especie: string;
  creado: Date;
  editado: Date;
  films: Film[];
  vehicles: Vehicle[];
}
