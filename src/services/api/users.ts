import type { HttpClient } from '@/services/http/http-client'
import type { UserService, UsersListRequestParams, UsersListResponse } from '@/services/api/api-types'

export function UserService(http: HttpClient): UserService {
  /**
   * Retrieves a list of users from the Random User API.
   *
   * @param {UsersListRequestParams} params - The request parameters.
   * @property {string[]} params.inc - The array containing the desired user information to include in the response.
   * @return {Promise<UsersListResponse>} A Promise that resolves with the list of users.
   */
  async function getUsers(params: UsersListRequestParams) {
    if (Array.isArray(params.inc)) {
      params.inc = params.inc.join(', ')
    }
    const response = await http.request<UsersListResponse>({
      url: 'https://randomuser.me/api',
      method: 'GET',
      params,
    })
    return response.data
  }

  return {
    getUsers,
  }
}
