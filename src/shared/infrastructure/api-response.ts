import { Response } from "lambda-api";
import { ALLOW_WEB_ORIGINS } from "../domain/config";
import { OK } from "http-status";

export class ApiResponse {
  private readonly statusCode: number;
  private readonly body: string;
  private readonly headers: { [key: string]: string };
  private readonly isBase64Encoded: boolean;
  private responseApi: Response;

  constructor(
    statusCode: number,
    body: string,
    headers: { [key: string]: string },
    isBase64Encoded: boolean,
    responseApi: Response,
  ) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = headers;
    this.isBase64Encoded = isBase64Encoded;
    this.responseApi = responseApi;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getBody(): string {
    return this.body;
  }

  getHeaders(): { [key: string]: string } {
    return this.headers;
  }

  isIsBase64Encoded(): boolean {
    return this.isBase64Encoded;
  }

  getResponseApi(): Response {
    return this.responseApi;
  }

  getResponse() {
    return this.buildHeaders()
      .status(this.statusCode)
      .json(this.buildMessage(this.statusCode, this.getBody()));
  }

  private buildHeaders() {
    const weborigin = ALLOW_WEB_ORIGINS;
    if (weborigin === "*") {
      this.responseApi = this.responseApi.header(
        "Access-Control-Allow-Origin",
        "*",
      );
    } else {
      const permitedOrigins = weborigin.split(",");
      // @ts-ignore
      const origin = this.responseApi._request.headers.origin;
      if (permitedOrigins.includes(origin)) {
        this.responseApi = this.responseApi.header(
          "Access-Control-Allow-Origin",
          origin,
        );
      }
    }

    return (
      this.responseApi
        .header("X-XSS-Protection", "1; mode=block")
        .header("X-Content-Type-Options", "nosniff")
        .header("Referrer-Policy", "no-referrer-when-downgrade")
        .header("X-Frame-Options", "SAMEORIGIN")
        .header("Content-Security-Policy", "default-src 'self'")
        // .header("Access-Control-Allow-Credentials", true)
        .header(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains",
        )
        .header(
          "Access-Control-Allow-Methods",
          "GET, PUT, POST, DELETE, OPTIONS,PATCH",
        )
        .header(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization, Content-Length, X-Requested-With",
        )
    );
  }

  buildMessage(code: number, message: string) {
    if (code === OK || code === OK + 1) {
      return message;
    }
    return {
      errors: {
        message,
      },
    };
  }

  static builder(): ApiResponseBuilder {
    return new ApiResponseBuilder();
  }
}

export class ApiResponseBuilder {
  private statusCode: number = 200;
  private headers: { [key: string]: string } = {};
  private rawBody: string | undefined;
  private objectBody: any;
  private binaryBody: Uint8Array | undefined;
  private base64Encoded: boolean = false;
  private responseApi: Response;

  setStatusCode(statusCode: number): ApiResponseBuilder {
    this.statusCode = statusCode;
    return this;
  }

  setResponseApi(response: Response): ApiResponseBuilder {
    this.responseApi = response;
    return this;
  }

  setHeaders(headers: { [key: string]: string }): ApiResponseBuilder {
    this.headers = headers;
    return this;
  }

  setRawBody(rawBody: string): ApiResponseBuilder {
    this.rawBody = rawBody;
    return this;
  }

  setObjectBody(objectBody: any): ApiResponseBuilder {
    this.objectBody = objectBody;
    return this;
  }

  setBinaryBody(binaryBody: Uint8Array): ApiResponseBuilder {
    this.binaryBody = binaryBody;
    this.setBase64Encoded(true);
    return this;
  }

  setBase64Encoded(base64Encoded: boolean): ApiResponseBuilder {
    this.base64Encoded = base64Encoded;
    return this;
  }

  build(): ApiResponse {
    let body: string | undefined = undefined;
    if (this.rawBody !== undefined) {
      body = this.rawBody;
    } else if (this.objectBody !== undefined) {
      body = this.objectBody;
    } else if (this.binaryBody !== undefined) {
      body = Buffer.from(this.binaryBody).toString("base64");
    }
    if (!body) {
      throw new Error("Body must be provided.");
    }
    return new ApiResponse(
      this.statusCode,
      body,
      this.headers,
      this.base64Encoded,
      this.responseApi,
    );
  }
}
