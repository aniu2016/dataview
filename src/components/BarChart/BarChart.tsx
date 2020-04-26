import React, {useRef, useEffect, useContext, memo} from 'react'
import {BaseChartProp} from '../../types/chart'
import {Chart} from '@antv/g2'
import {ViewContext} from '../View/view'
import {getDefaultChartSize} from '../../utils/chart'

interface BaseBarChartProps<T> extends BaseChartProp<T> {}

export const BarChart = memo(function ColumnChart(props) {
  const {data, position, options = {}, alias = {}} = props
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
    chart.scale(y, {nice: true})

    chart.scale(x, {
      alias: alias[x] || x,
      nice: true,
    })

    chart.scale(y, {
      alias: alias[y] || y,
      nice: true,
    })
    chart.coordinate().transpose()
    chart.tooltip({
      showMarkers: false,
    })
    chart.interaction('active-region')
    chart.interval().position(position.join('*'))
    chart.render()

    return () => {
      chart.clear()
    }
  }, [ViewCtx.inlineBlock, alias, data, options, position])

  return <div ref={dom}></div>
}) as <T>(props: BaseBarChartProps<T>) => React.ReactElement

export default BarChart
