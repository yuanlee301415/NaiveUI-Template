/*
 * 倒时计
 * */

import { ref, computed, onScopeDispose } from 'vue'

/**
 * 倒时计
 * @param duration 倒计时持续时间(单位:毫秒)
 */
export function useCountdown(duration = 0) {
  const hours = ref<number>(0)
  const minutes = ref<number>(0)
  const seconds = ref<number>(0)
  const isCounting = computed(() => !!(hours.value + minutes.value + seconds.value))
  const display = computed(() => [String(hours.value).padStart(2, '0'), String(minutes.value).padStart(2, '0'), String(seconds.value).padStart(2, '0')].join(':'))

  let remainingSeconds = (duration / 1000) | 0
  let timer: ReturnType<typeof setTimeout> | undefined

  function update(): void {
    seconds.value = (remainingSeconds % 60) | 0
    minutes.value = ((remainingSeconds / 60) % 60) | 0
    hours.value = (remainingSeconds / 60 / 60) | 0

    if (remainingSeconds <= 0) {
      clearTimeout(timer)
      remainingSeconds = (duration / 1000) | 0
      return
    }

    remainingSeconds -= 1

    timer = setTimeout(update, 1000)
  }

  function countdown(): void {
    if (isCounting.value) return
    update()
  }

  function reset(): void {
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    remainingSeconds = (duration / 1000) | 0
    clearTimeout(timer)
  }

  onScopeDispose(() => {
    clearTimeout(timer)
  })

  return {
    countdown,
    reset,
    hours,
    minutes,
    seconds,
    isCounting,
    display,
  }
}
