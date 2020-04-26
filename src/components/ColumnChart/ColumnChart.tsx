import React, {useRef, useEffect, useContext, memo} from 'react'
import {BaseChartProp} from '../../types/chart'
import {Chart} from '@antv/g2'
import {ViewContext} from '../View/view'

import {getDefaultChartSize} from '../../utils/chart'

interface BaseColumnChartProps<T> extends BaseChartProp<T> {
  /** 给层叠柱状图定义用来分类的字段名，该值必须是Data对象数组中的对象属性 */
  type?: keyof T
}

export const ColumnChart = memo(function ColumnChart(props) {
  const {data, position, options = {}, alias = {}, type} = props
  const ViewCtx = useContext(ViewContext)
  const dom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const [x, y] = position as [string, string]
    const chart = new Chart({
      // 根据 View 视图中 的inlineblock属性 获取默认的宽高
      ...getDefaultChartSize(!!ViewCtx.inlineBlock),
      ...options,
      container: dom.current!,
    })
    chart.data(data)

    chart.scale(x, {
      alias: alias[x] || x,
      nice: true,
    })

    chart.scale(y, {
      alias: alias[y] || y,
      nice: true,
    })

    chart.axis(x, {
      tickLine: null,
    })

    chart.tooltip({
      shared: true,
      showMarkers: false,
    })

    chart.interaction('active-region')

    const shapeInstance = chart
      .interval()
      .position(position.join('*'))
      .style(x, val => {
        return {
          fillOpacity: 1,
          lineWidth: 0,
          stroke: '#636363',
          lineDash: [3, 2],
        }
      })
    if (type) shapeInstance.color(type).adjust('stack')

    chart.render()

    return () => {
      chart.clear()
    }
  }, [ViewCtx.inlineBlock, alias, data, dom, options, position, type])

  return <div ref={dom}></div>
}) as <T>(props: BaseColumnChartProps<T>) => React.ReactElement

export default ColumnChart
