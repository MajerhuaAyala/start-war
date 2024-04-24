import { StringValueObject } from "../../../shared/domain/valueObject/StringValueObject";

export class FilmDirector extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value, true, "director");
    this.value = value;
  }
}
