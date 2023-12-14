import type { UserDTO, UsersListRequestParams } from '@/services/api/api-types'

import { useUserService } from '@/services/api'
import { useDataListStorage } from '@/composables/data-list'

/**
 * Fetches a list of users and manages the state of loading, users list and pagination.
 *
 * @param {number} perPage - The number of users to be fetched per page. Optional.
 *
 * @return {Object} - An object containing the following properties:
 *   - loading: A boolean indicating whether the users are currently being fetched.
 *   - users: An array of user objects.
 *   - fetchUsers: A function to fetch the next page of users.
 *
 */
export function useUsersList(perPage?: number) {
  const userService = useUserService()
  const { items, addItems, page, loading, responseInfo } = useDataListStorage<UserDTO>()

  if (perPage) {
    page.value.results = perPage
  }

  /**
   * Fetches users from the server.
   *
   * @param {UsersListRequestParams} params - Optional parameters for fetching users.
   * @return {void} - This method does not return any value.
   */
  function fetchUsers(params: UsersListRequestParams = {}) {
    if (!loading.value) {
      loading.value = true
      page.value.page++
      userService
        .getUsers({
          ...params,
          page: page.value.page,
          results: page.value.results,
        })
        .then(data => {
          addItems(data.results)
          responseInfo.value = data.info
        })
        .finally(() => {
          loading.value = false
        })
    }
  }

  return {
    loading,
    users: items,
    fetchUsers,
  }
}
