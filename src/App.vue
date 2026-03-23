<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseChart from './components/charts/BaseChart.vue'
import type { ChartOption } from './lib/echarts'

const showPie = ref(true)
const showMix = ref(true)

const pieOption = computed<ChartOption>(() => ({
  title: {
    text: '访问来源占比',
    left: 'center',
    top: 16,
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    left: 'center',
    bottom: 10,
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '52%'],
      label: {
        formatter: '{b}\n{d}%',
      },
      data: [
        { value: 1048, name: '直接访问' },
        { value: 735, name: '搜索引擎' },
        { value: 580, name: '广告投放' },
        { value: 484, name: '社交媒体' },
      ],
    },
  ],
}))

const mixOption = computed<ChartOption>(() => ({
  title: {
    text: '月度销售额 / 转化率',
    left: 16,
    top: 16,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 16,
    right: 16,
  },
  grid: {
    left: 16,
    right: 16,
    top: 72,
    bottom: 24,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: [
    {
      type: 'value',
      name: '销售额',
    },
    {
      type: 'value',
      name: '转化率',
      axisLabel: {
        formatter: '{value}% ',
      },
    },
  ],
  series: [
    {
      name: '销售额',
      type: 'bar',
      barMaxWidth: 36,
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      name: '转化率',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      data: [18, 32, 24, 19, 20, 28],
    },
  ],
}))
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
    <section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">BaseChart</p>
      <h1 class="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">基础 ECharts 封装</h1>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
        组件只处理实例创建、空状态、尺寸监听和重绘，后续你可以直接在它上面再封装饼图、柱折混合图等业务图表。
      </p>
    </section>

    <section class="flex flex-wrap gap-3">
      <button
        type="button"
        class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
        @click="showPie = !showPie"
      >
        切换饼图空状态：{{ showPie ? '有数据' : '空状态' }}
      </button>
      <button
        type="button"
        class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
        @click="showMix = !showMix"
      >
        切换混合图空状态：{{ showMix ? '有数据' : '空状态' }}
      </button>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <BaseChart :option="pieOption" :empty="!showPie" height="360px" />
      </div>

      <div class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
        <BaseChart :option="mixOption" :empty="!showMix" height="420px" />
      </div>
    </section>
  </main>
</template>
