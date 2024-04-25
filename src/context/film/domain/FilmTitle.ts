import { StringValueObject } from "../../../shared/domain/valueObject/StringValueObject";
import { InvalidArgumentError } from "../../../shared/domain/valueObject/InvalidArgumentError";

export class FilmTitle extends StringValueObject {
  readonly value: string;
  readonly formatTitle = /^[a-zA-Z0-9\s\-:]+$/;

  constructor(value: string) {
    super(value, true, "titulo");
    this.value = value;
    this.ensureFormatTitle(value);
  }

  private ensureFormatTitle(input: string) {
    const response = this.formatTitle.test(input);
    if (!response) {
      throw new InvalidArgumentError(
        `Formato del campo ${this.nameAttribute} es invalida`,
      );
    }
  }
}
