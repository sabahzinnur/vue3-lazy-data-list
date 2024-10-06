import { defineStore, PersistLocalStoragePlugin } from '@lightway/a-store'
import type { UserDTO } from '@/services/api/api-types'

type StoreType = {
  users: UserDTO[]
}

export const store = defineStore<StoreType>(
  {
    users: [],
  },
  {
    plugins: [new PersistLocalStoragePlugin('lists')],
  }
)
