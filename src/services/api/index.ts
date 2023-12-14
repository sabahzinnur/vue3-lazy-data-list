import { getHttpClient } from '@/services/http'
import { UserService } from '@/services/api/users'

const httpClient = getHttpClient()

const userService = UserService(httpClient)

export function useUserService() {
  return userService
}
