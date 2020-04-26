import React from 'react'
import {storiesOf} from '@storybook/react'
import View from '../View/view'
import CurvedLineChart from './CurvedLineChart'

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
      <CurvedLineChart data={data} position={['time', 'value']} alias={{time: '时间段', value: '消费额'}} />
    </View>
  )
}

const MultiChart = () => {
  const data = [
    {time: '9:00-10:00', value: 30, name: 'Beijing'},
    {time: '10:00-11:00', value: 90, name: 'Beijing'},
    {time: '11:00-12:00', value: 50, name: 'Beijing'},
    {time: '12:00-13:00', value: 30, name: 'Beijing'},
    {time: '13:00-14:00', value: 70, name: 'Beijing'},

    {time: '9:00-10:00', value: 40, name: 'Shenzhen'},
    {time: '10:00-11:00', value: 60, name: 'Shenzhen'},
    {time: '11:00-12:00', value: 30, name: 'Shenzhen'},
    {time: '12:00-13:00', value: 20, name: 'Shenzhen'},
    {time: '13:00-14:00', value: 80, name: 'Shenzhen'},
  ]
  return (
    <View title="消费时间段" inlineBlock>
      <CurvedLineChart
        data={data}
        position={['time', 'value']}
        alias={{time: '时间段', value: '消费额', name: 'City'}}
        type="name"
      />
    </View>
  )
}

const textDefault = `

&nbsp;

#### 示例代码
&nbsp;
~~~javascript
import React from 'react'
import {View, CurvedLineChart} from 'dataview'
import 'dataview/lib/index.css'

const YourComponent:React.FC<{}> = () => {
  const data = [
    {time: '9:00-10:00', value: 40},
    {time: '10:00-11:00', value: 60},
    {time: '11:00-12:00', value: 30},
    {time: '12:00-13:00', value: 20},
    {time: '13:00-14:00', value: 80},
  ]
  
  return (
    <View title="消费时间段" inlineBlock>
      <CurvedLineChart 
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

const textMulti = `

&nbsp;

#### 示例代码
&nbsp;
~~~javascript
import React from 'react'
import {View, CurvedLineChart} from 'dataview'
import 'dataview/lib/index.css'

const YourComponent:React.FC<{}> = () => {
  const data = [
    {time: '9:00-10:00', value: 30, name: 'Beijing'},
    {time: '10:00-11:00', value: 90, name: 'Beijing'},
    {time: '11:00-12:00', value: 50, name: 'Beijing'},
    {time: '12:00-13:00', value: 30, name: 'Beijing'},
    {time: '13:00-14:00', value: 70, name: 'Beijing'},

    {time: '9:00-10:00', value: 40, name: 'Shenzhen'},
    {time: '10:00-11:00', value: 60, name: 'Shenzhen'},
    {time: '11:00-12:00', value: 30, name: 'Shenzhen'},
    {time: '12:00-13:00', value: 20, name: 'Shenzhen'},
    {time: '13:00-14:00', value: 80, name: 'Shenzhen'},
  ]
  
  return (
    <View title="消费时间段" inlineBlock>
      <CurvedLineChart 
        data={data} 
        position={['time', 'value']} 
        alias={{time: '时间段', value: '消费额'}} 
        type="name"
      />
    </View>
  )
}
export default YourComponent
~~~
`

storiesOf('曲线图 组件', module)
  .add('常规', DefaultChart, {
    info: {
      propTablesExclude: [View],
      source: false,
      text: textDefault,
    },
  })
  .add('双轴曲线', MultiChart, {
    info: {
      propTablesExclude: [View],
      source: false,
      text: textMulti,
    },
  })
