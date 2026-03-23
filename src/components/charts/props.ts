import type { PropType } from 'vue'
import type { ChartOption } from '../../lib/echarts'

export interface BaseChartProps {
  option?: ChartOption
  empty?: boolean
  emptyText?: string
  autoresize?: boolean
  height?: string
}

export const baseChartProps = {
  option: {
    type: Object as PropType<ChartOption>,
    default: () => ({}),
  },
  empty: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  autoresize: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: '320px',
  },
} as const
