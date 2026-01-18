export interface ApiResponse<T = any> {
  codigo: string;
  mensagem?: string;
  dados?: T;
}
