import { computed, watch } from 'vue'

import type { Ref } from 'vue'

/**
 * Creates and initializes an IntersectionObserver to monitor the visibility of a specified target element.
 *
 * @param {Ref<HTMLElement | null>} target - The target element to be observed.
 * @param {IntersectionObserverCallback} callback - The function to be called whenever the target element crosses the visibility threshold.
 * @param {IntersectionObserverInit} [options={}] - The options to configure the intersection observer.
 * @returns {Object} - An object containing the following properties:
 *                    - isSupported: A computed property indicating whether the IntersectionObserver is supported by the current browser.
 *                    - stop: A function to stop observing the target element and disconnect the IntersectionObserver.
 */
export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) {
  /**
   * Check if the current environment supports `IntersectionObserver`.
   *
   * @returns {boolean} True if `IntersectionObserver` is supported, false otherwise.
   */
  const isSupported = computed(() => window && 'IntersectionObserver' in window)
  const observer = new IntersectionObserver(callback, options)

  watch(target, () => {
    if (isSupported.value && target.value) {
      observer.observe(target.value)
    }
  })

  /**
   * Stops observing the target element if it is supported.
   *
   * @returns {void}
   */
  function stop() {
    if (isSupported.value && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  }

  return {
    isSupported,
    stop,
  }
}
