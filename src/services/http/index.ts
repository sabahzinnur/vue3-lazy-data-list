import { getFetchClient } from './fetch-client'
import type { HttpClient } from './http-client'

const client = getFetchClient()
export function getHttpClient(): HttpClient {
  return client
}