import { StringValueObject } from "../../../shared/domain/valueObject/StringValueObject";

export class FilmId extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value, true, "id");
    this.value = value;
  }
}
