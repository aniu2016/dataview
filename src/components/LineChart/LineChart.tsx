import React, {useRef, useEffect, useContext, memo} from 'react'
import {BaseChartProp} from '../../types/chart'
import {Chart} from '@antv/g2'
import {ViewContext} from '../View/view'
import {getDefaultChartSize} from '../../utils/chart'

interface BaseLineChartProps<T> extends BaseChartProp<T> {
  /** 给折线图定义用来分类的字段名，该值必须是Data对象数组中的对象属性 */
  type?: string
}

export const LineChart = memo(function ColumnChart(props) {
  const {data, position, options = {}, type, alias = {}} = props
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

    chart.scale({
      [x]: {
        alias: alias[x] || x,
        range: [0, 1],
      },
      [y]: {
        alias: alias[y] || y,
        min: 0,
        nice: true,
      },
    })

    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    })

    const lineShapeInstance = chart
      .line()
      .position(position.join('*'))
      .label(y as string)
    const pointShapeInstance = chart.point().position(position.join('*'))
    if (type) {
      lineShapeInstance.color(type)
      pointShapeInstance.color(type)
    }
    chart.render()
    return () => {
      chart.clear()
    }
  }, [ViewCtx.inlineBlock, alias, data, options, position, type])

  return <div ref={dom}></div>
}) as <T>(props: BaseLineChartProps<T>) => React.ReactElement

export default LineChart
