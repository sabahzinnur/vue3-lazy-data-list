import { ref } from 'vue'

import type { Ref } from 'vue'
import type { ResponseInfo } from '@/services/api/api-types'

/**
 * Use Data List Storage
 *
 * A utility function that provides a reactive data list storage functionality.
 *
 * @template T - The type of data stored in the list
 *
 * @return {Object} - An object containing the following properties:
 *   - items: A reference to an array containing the list of items
 *   - loading: A reference to a boolean variable indicating the loading state
 *   - page: A reference to an object representing the page information
 *   - responseInfo: A reference to an object representing the last response information
 *   - addItems: A function to add items to the list
 *   - setItems: A function to set the list of items
 */
export function useDataListStorage<T>() {
  const items: Ref<T[]> = ref([])
  const loading = ref(false)
  // todo make it reactive
  const page = ref<ResponseInfo>({
    page: 0,
    results: 10,
  })
  const responseInfo = ref<ResponseInfo>({
    page: 0,
    results: 10,
  })

  function addItems(data: T[]) {
    items.value.push(...data)
  }

  function setItems(data: T[]) {
    items.value = data
  }

  return { items, addItems, setItems, loading, page, responseInfo }
}
