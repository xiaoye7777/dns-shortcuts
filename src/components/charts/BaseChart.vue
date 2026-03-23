<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getECharts, type ChartInstance } from '../../lib/echarts'
import { baseChartProps } from './props'

const props = defineProps(baseChartProps)

const rootRef = ref<HTMLDivElement | null>(null)
const chartRef = ref<ChartInstance | null>(null)
const pending = ref(false)
const errorText = ref('')

let observer: ResizeObserver | null = null
let frame = 0

const resize = () => {
  if (frame) {
    cancelAnimationFrame(frame)
  }

  frame = requestAnimationFrame(() => chartRef.value?.resize())
}

const render = async () => {
  if (!rootRef.value) {
    return
  }

  if (props.empty) {
    chartRef.value?.clear()
    return
  }

  try {
    pending.value = true
    errorText.value = ''

    if (!chartRef.value) {
      const echarts = await getECharts()

      if (!rootRef.value) {
        return
      }

      chartRef.value = echarts.init(rootRef.value)
    }

    chartRef.value.setOption(props.option, { notMerge: true, lazyUpdate: true })
    await nextTick()
    resize()
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '图表初始化失败'
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  void render()

  if (props.autoresize && rootRef.value) {
    observer = new ResizeObserver(resize)
    observer.observe(rootRef.value)
  }

  window.addEventListener('resize', resize)
})

watch(
  () => props.option,
  () => void render(),
  { deep: true },
)

watch(
  () => props.empty,
  () => void render(),
)

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }

  observer?.disconnect()
  window.removeEventListener('resize', resize)
  chartRef.value?.dispose()
})

defineExpose({
  resize,
  getInstance: () => chartRef.value,
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white" :style="{ height }">
    <div ref="rootRef" class="h-full w-full" />

    <div
      v-if="pending || errorText || empty"
      class="absolute inset-0 flex items-center justify-center bg-white/90 px-6 text-sm text-slate-500 backdrop-blur-sm"
      :class="pending ? 'text-blue-600' : ''"
    >
      {{ pending ? '图表初始化中...' : errorText || emptyText }}
    </div>
  </div>
</template>
