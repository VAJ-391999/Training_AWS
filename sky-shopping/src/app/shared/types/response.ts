export interface Response<T> {
  error: boolean;
  message: string;
  data: T;
}
