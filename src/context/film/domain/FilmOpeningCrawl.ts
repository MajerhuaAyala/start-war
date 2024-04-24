import { StringValueObject } from "../../../shared/domain/valueObject/StringValueObject";

export class FilmOpeningCrawl extends StringValueObject {
  readonly value: string;

  constructor(value: string) {
    super(value, false, "apertura");
    this.value = value;
  }
}
