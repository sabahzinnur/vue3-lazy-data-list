<template>
  <div class="card-container">
    <span class="pro">{{ user?.name.title }}</span>
    <img class="round" crossorigin="anonymous" :src="user?.picture.medium" alt="user" />
    <h3>{{ user.name?.first }} {{ user.name?.last }}</h3>
    <h6>{{ user.location?.city }}</h6>
    <p>
      {{ user.location?.country }}
      <br />
      {{ user.location?.street.number }} {{ user.location?.street.name }}
    </p>
    <div class="skills">
      <h6>Phones:</h6>
      <ul>
        <li>{{ user?.cell }}</li>
        <li>{{ user?.phone }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserDTO } from '@/services/api/api-types'

defineProps<{
  user: UserDTO
}>()
</script>

<style scoped>
.card-container {
  background-color: #231e39;
  border-radius: 5px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #b3b8cd;
  padding-top: 30px;
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;
}

.card-container .pro {
  color: #231e39;
  background-color: #febb0b;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.card-container .round {
  border: 1px solid #03bfcb;
  border-radius: 50%;
  padding: 7px;
}

.skills {
  background-color: #1f1a36;
  text-align: left;
  padding: 15px;
  margin-top: 30px;
}

.skills ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.skills ul li {
  border: 1px solid #2d2747;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  margin: 0 7px 7px 0;
  padding: 7px;
}
</style>
