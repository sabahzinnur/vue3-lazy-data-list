<template>
  <div ref="target">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'IntersectionObservable',
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@/composables/intersection-observer'

const props = defineProps({
  stopObserve: { type: Boolean, default: false },
  stopOnIntersection: { type: Boolean, default: true },
})
const emit = defineEmits(['intersection'])

const target = ref(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})

watch(isVisible, newVal => {
  if (newVal) {
    emit('intersection')
    if (props.stopOnIntersection) {
      stop()
    }
  }
})

watch(
  () => props.stopObserve,
  newVal => {
    if (newVal) stop()
  }
)
</script>
<style lang="stylus" scoped></style>
