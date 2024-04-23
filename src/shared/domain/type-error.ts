export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  MAINTENANCE = 503,
}

export enum TYPE_REGISTER_LOG {
  SMS = "SMS",
  ACCOUNT = "ACCOUNT",
  ERROR = "ERROR",
  INFO = "INFO",
  WARN = "WARN",
}

export class ApiError {
  status: STATUS_CODE;
  message: string;
  type: TYPE_REGISTER_LOG;

  constructor(message: string, status: STATUS_CODE, type: TYPE_REGISTER_LOG) {
    this.status = status;
    this.message = message;
    this.type = type;
  }
}

export class NotFoundError extends ApiError {
  constructor(
    message: string = "Not Found",
    type: TYPE_REGISTER_LOG = TYPE_REGISTER_LOG.ERROR,
  ) {
    super(message, STATUS_CODE.NOT_FOUND, type);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message: string = "UnauthorizedError",
    type: TYPE_REGISTER_LOG = TYPE_REGISTER_LOG.ACCOUNT,
  ) {
    super(message, STATUS_CODE.NOT_AUTHORIZED, type);
  }
}

export class BadRequestError extends ApiError {
  constructor(
    message: string = "BadRequest",
    type: TYPE_REGISTER_LOG = TYPE_REGISTER_LOG.ERROR,
  ) {
    super(message, STATUS_CODE.BAD_REQUEST, type);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    message: string = "InternalServerError",
    type: TYPE_REGISTER_LOG.ERROR = TYPE_REGISTER_LOG.ERROR,
  ) {
    super(message, STATUS_CODE.INTERNAL_SERVER_ERROR, type);
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    message: string = "ForbiddenError",
    type: TYPE_REGISTER_LOG = TYPE_REGISTER_LOG.ACCOUNT,
  ) {
    super(message, STATUS_CODE.FORBIDDEN, type);
  }
}
