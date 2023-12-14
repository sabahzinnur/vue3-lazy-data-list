import type {
  HttpClient,
  HttpClientError,
  HttpRequestConfig,
  HttpResponse,
  RequestHeaders,
  ResponseError,
  ResponseHeaders,
} from './http-client'
import { getUrlPath } from '@/lib/utilities'

type ErrorHandler = (error: HttpClientError) => any

/**
 * Represents a client HTTP error.
 * @class
 * @extends Error
 * @implements ClientError
 * @template T - The type of the response data.
 * @template D - The type of the request payload.
 */
class ClientError<T = unknown, D = any> extends Error implements ClientError {
  constructor(config?: HttpRequestConfig<D>, message?: string, response?: HttpResponse<T, D>) {
    super()

    this.name = 'HttpClientError'
    this.config = config

    message && (this.message = message)
    response && (this.response = response)
  }

  config?: HttpRequestConfig<D>
  response?: HttpResponse<T, D> | undefined
}

let baseUrl: string = ''
const globalHeaders: RequestHeaders = {
  responseType: 'application/json; charset=UTF-8',
}
const onErrorHandlers: ErrorHandler[] = []

/**
 * Constructs a URL based on the given configuration.
 *
 * @param {HttpRequestConfig} config - The configuration object for generating the URL.
 * @return {URL} - The constructed URL.
 */
function getUrl(config: HttpRequestConfig) {
  const url = new URL(getUrlPath(config.url, baseUrl))
  if (config.params) {
    Object.keys(config.params).forEach(key => {
      url.searchParams.set(key, config.params[key])
    })
  }
  return url
}

/**
 * Creates fetch headers from the provided request headers.
 *
 * @param headers - The request headers to be converted into fetch headers.
 * @returns The headers object in the format expected by the fetch API.
 */
function createFetchHeaders(headers: RequestHeaders): HeadersInit {
  return Object.keys(headers).reduce((result, key) => {
    result[key] = String(headers[key])
    return result
  }, {} as Record<string, string>)
}

/**
 * Creates a `RequestInit` object with the provided configuration options.
 *
 * @param {HttpRequestConfig} config - The configuration options for the request.
 * @returns {RequestInit} - The initialized `RequestInit` object.
 */
function createRequestInit(config: HttpRequestConfig): RequestInit {
  const init: RequestInit = {
    method: config.method,
    headers: createFetchHeaders(Object.assign({}, globalHeaders, config.headers)),
  }

  if (config.body) {
    init.body = config.body instanceof FormData ? config.body : JSON.stringify(config.body || {})
  }
  return init
}

/**
 * Retrieves the headers from a response.
 *
 * @param {Response} response - The response object.
 * @return {ResponseHeaders} - The headers of the response.
 */
function getResponseHeaders(response: Response): ResponseHeaders {
  const headers: ResponseHeaders = {}
  response.headers.forEach((headerValue, headerKey) => {
    headers[headerKey] = headerValue
  })
  return headers
}

/**
 * Retrieves a response from a server and constructs an HttpResponse object.
 *
 * @param {Response} response - The received response from the server.
 * @param {HttpRequestConfig} config - The request configuration object.
 * @returns {Promise<HttpResponse>} A promise that resolves to an HttpResponse object containing the status, headers, data, and config.
 */
async function getResponse(response: Response, config: HttpRequestConfig): Promise<HttpResponse> {
  const httpResponse: HttpResponse = {
    status: response.status,
    headers: getResponseHeaders(response),
    data: null,
    config,
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    httpResponse.data = await response.json()
  } else if (contentType && contentType.includes('application/octet-stream')) {
    httpResponse.data = await response.blob()
  } else {
    httpResponse.data = await response.text()
  }

  return httpResponse
}

/**
 * Retrieves the error from the HTTP response.
 *
 * @param {HttpResponse} [response] - The HTTP response object.
 * @returns {HttpClientError} - The client error object.
 */
export function getResponseError(response?: HttpResponse<ResponseError>): HttpClientError {
  const config = response && response.config
  const message =
    (response && response.data.message) || `[HttpClient] Error: server response status: ${response?.status}`
  return new ClientError(config, message, response)
}

/**
 * Make an async HTTP request using fetch.
 *
 * @param {HttpRequestConfig} config - The HTTP request configuration.
 * @returns {Promise<HttpResponse>} The promise that resolves to the HTTP response.
 * @throws {ClientError} If the request is failed.
 */
async function makeRequest<T = any, D = any>(config: HttpRequestConfig): Promise<HttpResponse<T, D>> {
  return fetch(getUrl(config), createRequestInit(config))
    .then(async response => {
      const httpResponse = await getResponse(response, config)
      if (!response.ok) {
        // throw error if request is failed
        throw getResponseError(httpResponse)
      } else {
        return httpResponse
      }
    })
    .catch(error => {
      if (!(error instanceof ClientError)) {
        error = new ClientError(config, error.message)
      }
      onErrorHandlers.forEach(callback => callback(error))
      return Promise.reject(error)
    })
}

const httpClient: HttpClient = {
  setBaseUrl(url: string) {
    baseUrl = url
  },
  setHeader(header: string, value: string) {
    globalHeaders[header] = value
  },
  request<T = any, D = any>(config: HttpRequestConfig<D>): Promise<HttpResponse<T, D>> {
    return makeRequest(config)
  },
  onError(callback: (error: HttpClientError) => any) {
    onErrorHandlers.push(callback)
  },
}

/**
 * Retrieves the fetch client instance.
 *
 * @returns {HttpClient} The fetch client instance.
 */
export function getFetchClient(): HttpClient {
  return httpClient
}
