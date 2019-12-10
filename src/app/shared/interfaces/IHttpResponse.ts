export interface IHttpResponse<T> {
  status: string;
  data: T | null;
  message: string | null;
}
