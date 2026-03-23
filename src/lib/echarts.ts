export type ChartOption = Record<string, unknown>

export interface ChartInstance {
  setOption: (option: ChartOption, opts?: { notMerge?: boolean; lazyUpdate?: boolean }) => void
  resize: () => void
  dispose: () => void
  clear: () => void
}

interface EChartsCore {
  init: (element: HTMLDivElement) => ChartInstance
  use: (modules: unknown[]) => void
}

const VERSION = '5.6.0'
const BASE_URL = `https://esm.sh/echarts@${VERSION}`
let echartsPromise: Promise<EChartsCore> | null = null

async function importModule<T>(path: string): Promise<T> {
  return import(/* @vite-ignore */ `${BASE_URL}/${path}?bundle`) as Promise<T>
}

export async function getECharts() {
  if (!echartsPromise) {
    echartsPromise = (async () => {
      const [core, charts, components, renderers] = await Promise.all([
        importModule<EChartsCore>('core'),
        importModule<Record<string, unknown>>('charts'),
        importModule<Record<string, unknown>>('components'),
        importModule<Record<string, unknown>>('renderers'),
      ])

      core.use([
        charts.PieChart,
        charts.BarChart,
        charts.LineChart,
        components.TitleComponent,
        components.TooltipComponent,
        components.LegendComponent,
        components.GridComponent,
        components.DatasetComponent,
        renderers.CanvasRenderer,
      ])

      return core
    })()
  }

  return echartsPromise
}
