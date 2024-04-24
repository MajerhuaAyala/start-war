import { NumberValueObject } from "../../../shared/domain/valueObject/NumberValueObject";

export class FilmEpisode extends NumberValueObject {
  readonly value: number;

  constructor(value: number) {
    super(value, true, "episodio");
    this.value = value;
  }
}
