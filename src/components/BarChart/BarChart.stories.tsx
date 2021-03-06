import React from 'react'
import {storiesOf} from '@storybook/react'
import View from '../View/view'
import BarChart from './BarChart'
const DefaultChart = () => {
  const data = [
    {time: '9:00-10:00', value: 30},
    {time: '10:00-11:00', value: 90},
    {time: '11:00-12:00', value: 50},
    {time: '12:00-13:00', value: 30},
    {time: '13:00-14:00', value: 70},
  ]
  return (
    <View title="消费时间段" inlineBlock>
      <BarChart data={data} position={['time', 'value']} alias={{time: '时间段', value: '消费额'}} />
    </View>
  )
}

const textDefault = `

&nbsp;

#### 示例代码
&nbsp;
~~~javascript
import React from 'react'
import {View, BarChart} from 'dataview'
import 'dataview/lib/index.css'

const YourComponent:React.FC<{}> = () => {
  const data = [
    {time: '9:00-10:00', value: 30},
    {time: '10:00-11:00', value: 90},
    {time: '11:00-12:00', value: 50},
    {time: '12:00-13:00', value: 30},
    {time: '13:00-14:00', value: 70},
  ]
  
  return (
    <View title="消费时间段" inlineBlock>
      <BarChart 
        data={data} 
        position={['time', 'value']} 
        alias={{time: '时间段', value: '消费额'}} 
      />
    </View>
  )
}
export default YourComponent
~~~
`

storiesOf('条形图 组件', module).add('常规', DefaultChart, {
  info: {
    propTablesExclude: [View],
    source: false,
    text: textDefault,
  },
})
