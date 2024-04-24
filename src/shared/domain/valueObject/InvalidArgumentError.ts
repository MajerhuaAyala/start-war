import { STATUS_CODE } from "../type-error";

export class InvalidArgumentError extends Error {
  readonly status: number;

  constructor(message: string, status: number = STATUS_CODE.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}
