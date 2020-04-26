import React, {useRef, useEffect, useContext, memo} from 'react'
import {BaseChartProp} from '../../types/chart'
import {Chart} from '@antv/g2'
import {ViewContext} from '../View/view'
import {getDefaultChartSize} from '../../utils/chart'

interface BaseDonutChartProps<T> extends BaseChartProp<T> {}

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

export const DonutChart = memo(function ColumnChart(props) {
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

    chart.data(data)
    chart.scale('_percent', {
      formatter: val => {
        val = val * 100 + '%'
        return val
      },
    })
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    })
    chart.tooltip({
      showMarkers: false,
    })

    // 辅助文本
    // chart
    //   .annotation()
    //   .text({
    //     position: ['50%', '50%'],
    //     content: '主机',
    //     style: {
    //       fontSize: 14,
    //       fill: '#8c8c8c',
    //       textAlign: 'center',
    //     },
    //     offsetY: -20,
    //   })
    //   .text({
    //     position: ['50%', '50%'],
    //     content: '200',
    //     style: {
    //       fontSize: 20,
    //       fill: '#8c8c8c',
    //       textAlign: 'center',
    //     },
    //     offsetX: -10,
    //     offsetY: 20,
    //   })
    //   .text({
    //     position: ['50%', '50%'],
    //     content: '台',
    //     style: {
    //       fontSize: 14,
    //       fill: '#8c8c8c',
    //       textAlign: 'center',
    //     },
    //     offsetY: 20,
    //     offsetX: 20,
    //   })
    chart
      .interval()
      .adjust('stack')
      .position('_percent')
      .color(x as string)
      .label('_percent', percent => {
        return {
          content: data => {
            return `${data[x as string]}: ${Math.trunc(percent * 100)}%`
          },
        }
      })
      .tooltip(`${x}*_percent`, (item, percent) => {
        percent = Math.trunc(percent * 100) + '%'
        return {
          name: item,
          value: percent,
        }
      })

    chart.interaction('element-active')

    chart.render()

    return () => {
      chart.clear()
    }
  }, [ViewCtx.inlineBlock, alias, dom, options, position, source])

  return <div ref={dom}></div>
}) as <T>(props: BaseDonutChartProps<T>) => React.ReactElement

export default DonutChart
