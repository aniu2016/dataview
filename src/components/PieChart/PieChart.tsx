import React, {useRef, useEffect, useContext, memo} from 'react'
import {BaseChartProp} from '../../types/chart'
import {Chart} from '@antv/g2'
import {ViewContext} from '../View/view'
import {getDefaultChartSize} from '../../utils/chart'

interface BasePieChartProps<T> extends BaseChartProp<T> {}

function formatPercentData<T, K extends keyof T>(source: T[], propName: K): any[] {
  let sum = 0

  source.forEach((item: T) => {
    if (typeof item[propName] === 'number') {
      sum += (item[propName] as unknown) as number
    }
  })

  let data = source.map(item => {
    return {
      ...item,
      _percent: ((item[propName] as unknown) as number) / sum,
    }
  })
  return data
}

export const PieChart = memo(function ColumnChart(props) {
  const {data: source, position, options = {}, alias = {}} = props
  const ViewCtx = useContext(ViewContext)
  const dom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const [x, y] = position
    const data = formatPercentData(source, y)

    const chart = new Chart({
      // 根据 View 视图中 的inlineblock属性 获取默认的宽高
      ...getDefaultChartSize(!!ViewCtx.inlineBlock),
      ...options,
      container: dom.current!,
    })

    chart.coordinate('theta', {
      radius: 0.7,
    })

    chart.data(data)

    chart.scale('_percent', {
      formatter: val => {
        val = Math.trunc(val * 100) + '%'
        return val
      },
    })

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    })

    chart
      .interval()
      .position('_percent')
      .color(x as string)
      .label('percent', {
        content: (data: any) => {
          return `${data[x]}: ${Math.trunc(data._percent * 100)}%`
        },
      })
      .adjust('stack')

    chart.interaction('element-active')

    chart.render()

    return () => {
      chart.clear()
    }
  }, [ViewCtx.inlineBlock, alias, dom, options, position, source])

  return <div ref={dom}></div>
}) as <T>(props: BasePieChartProps<T>) => React.ReactElement

export default PieChart
