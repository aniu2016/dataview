import React, {createRef, useEffect} from 'react'
import {storiesOf} from '@storybook/react'
import View from './view'
import {Chart} from '@antv/g2'

const data = [
  {time: '10以下', value: 30},
  {time: '10~20', value: 90},
  {time: '20~30', value: 50},
  {time: '30~40', value: 30},
  {time: '40~50', value: 70},
  {time: '100以上', value: 120},
]

const data2 = [
  {type: '新用户', value: 4200},
  {type: '活跃用户', value: 3800},
  {type: '流失用户', value: 2600},
  {type: '回流用户', value: 800},
]

const DefaultChart: React.FC<{}> = () => {
  const dom = createRef<any>()
  useEffect(() => {
    const chart = new Chart({
      container: dom.current!,
      width: 376,
      height: 228,
    })
    chart.data(data)
    chart.scale('value', {
      alias: '销售额(万)',
      nice: true,
    })
    chart.axis('time', {
      tickLine: null,
    })

    chart.tooltip({
      showMarkers: false,
    })
    chart.interaction('active-region')

    chart
      .interval()
      .position('time*value')
      .style('time', val => {
        return {
          fillOpacity: 1,
          lineWidth: 0,
          stroke: '#636363',
          lineDash: [3, 2],
        }
      })

    chart.render()
  }, [dom])
  return <div ref={dom}></div>
}
const DefaultView = () => {
  return (
    <View title="标签人数分布" inlineBlock>
      {/* 使用时这里的DIV替换为图表示例Dom， 同时也可以不只是图表 */}
      {/* <div ref={dom}></div> */}
      <DefaultChart />
    </View>
  )
}
const SlotChart: React.FC<{}> = () => {
  const dom = createRef<any>()
  useEffect(() => {
    const chart = new Chart({
      container: dom.current!,
      autoFit: true,
      height: 148,
      padding: [0, 50, 20, 80],
    })
    chart.data(data2)
    chart.scale({
      value: {
        alias: '销量（百万）',
      },
    })
    chart.axis('type', {
      title: null,
      tickLine: null,
      line: null,
    })

    chart.axis('value', {
      label: null,
      title: {
        offset: 30,
        style: {
          fontSize: 12,
          fontWeight: 300,
        },
      },
    })
    chart.legend(false)
    chart.coordinate().transpose()
    chart
      .interval()
      .position('type*value')
      .label('value', {
        style: {
          fill: '#8d8d8d',
        },
        offset: 10,
      })
    chart.interaction('element-active')
    chart.render()
  }, [dom])
  return <div ref={dom}></div>
}
const SlotView = () => {
  const HeaderSlot = (
    <div style={{fontSize: '14px'}}>
      <span style={{fontSize: '20px'}}>12,154</span>人<span style={{paddingRight: '20px'}}></span>
      <span style={{paddingRight: '20px'}}>标签创建时间 2019-10-15 11:11:11</span>
      <span>标签更新时间 2020-03-15 11:11:11</span>
    </div>
  )
  return (
    <View title="标签人数分布" headerSlot={HeaderSlot}>
      {/* 使用时这里的DIV替换为图表示例Dom， 同时也可以不只是图表 */}
      <SlotChart />
    </View>
  )
}

const textDefault = `

&nbsp;

#### 示例代码
&nbsp;
~~~javascript
import React from 'react'
import {View} from 'dataview'
import 'dataview/lib/index.css'

const YourComponent:React.FC<{}> = () => {
  const HeaderSlot = (
    <div style={{fontSize: '14px'}}>
      <span style={{fontSize: '20px'}}>12,154</span>人<span style={{paddingRight: '20px'}}></span>
      <span style={{paddingRight: '20px'}}>标签创建时间 2019-10-15 11:11:11</span>
      <span>标签更新时间 2020-03-15 11:11:11</span>
    </div>
  )
  return (
    <View title="标签人数分布" headerSlot={HeaderSlot}>
      {/* 使用时这里的SlotChart替换为图表示例Dom， 同时也可以不只是图表 */}
      <SlotChart />
    </View>
  )
}
export default YourComponent
~~~
`

storiesOf('View 组件', module)
  .add('常规', DefaultView, {
    info: {
      propTablesExclude: [DefaultChart],
    },
  })
  .add('使用插槽', SlotView, {
    info: {
      propTablesExclude: [SlotChart],
      source: false,
      text: textDefault,
    },
  })
