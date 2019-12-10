export interface IResponse {
  status?: string;
  message?: 'success' | 'error' | null;
  data?: any;
}

