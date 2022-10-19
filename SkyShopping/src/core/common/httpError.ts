export interface IHttpError {
  statusCode: number;
  message: string;
  data: any;
}

export class HttpError extends Error {
  statusCode: number;
  message: string;
  data: any;
  constructor(httpError: IHttpError) {
    super(httpError.message);
    this.statusCode = httpError.statusCode;
    this.message = httpError.message;
    this.data = httpError.data;
  }
}
