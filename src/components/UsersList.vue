<template>
  <div class="user-card" v-for="(user, idx) in users" :key="user.id.value">
    <intersection-observable @intersection="watchOnList(idx)">
      <user-card :user="user" />
    </intersection-observable>
  </div>
  <div class="loading" v-if="loading">Loading...</div>
</template>
<script setup lang="ts">
import { useUsersList } from '@/composables/users-list'

import UserCard from '@/components/UserCard.vue'
import IntersectionObservable from '@/components/IntersectionObservable.vue'

const { fetchUsers, loading, users } = useUsersList(20)
const ITEMS_LEFT_BEFORE_UPDATE = 10

fetchItems()

function fetchItems() {
  fetchUsers({ inc: ['name', 'gender', 'id', 'picture', 'location', 'cell', 'phone'] })
}

function watchOnList(idx: number) {
  if (idx >= users.value.length - ITEMS_LEFT_BEFORE_UPDATE) {
    fetchItems()
  }
}
</script>

<style scoped>
.user-card {
  padding: 20px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #febb0b;
}
</style>
