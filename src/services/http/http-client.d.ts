export type RequestMethod = 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type RequestHeaders = Record<string, string | number | boolean>
export type ResponseHeaders = Record<string, string | number | boolean | null>
export interface HttpRequestConfig<T = any> {
  method: RequestMethod
  url: string
  headers?: RequestHeaders
  params?: T
  body?: any
}
export interface HttpResponse<T = any, D = any> {
  data: T
  status: number
  headers: ResponseHeaders
  config: HttpRequestConfig<D>
}
export interface ResponseError {
  message: string
  errors?: any[]
}

export interface HttpClientError<T = unknown, D = any> extends Error {
  config?: HttpRequestConfig<D>
  response?: HttpResponse<T, D>
}

export interface HttpClient {
  request<T = any, D = any>(config: HttpRequestConfig<D>): Promise<HttpResponse<T, D>>
  setBaseUrl(url: string): void
  setHeader(name: string, value: string): void
  onError(callback: (error: HttpClientError) => any): void
}
