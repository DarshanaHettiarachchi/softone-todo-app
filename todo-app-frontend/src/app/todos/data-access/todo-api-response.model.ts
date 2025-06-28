export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string | null;
  validationErrors: string[] | null;
}
