import { StringValueObject } from "../../../shared/domain/valueObject/StringValueObject";

export class FilmTitle extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value, true, "titulo");
    this.value = value;
  }
}
