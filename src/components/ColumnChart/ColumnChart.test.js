import React from 'react'
import {render} from '@testing-library/react'
import View from '../View/view'
import Chart from './ColumnChart'
const data = [
  {time: '9:00-10:00', value: 30},
  {time: '10:00-11:00', value: 90},
  {time: '11:00-12:00', value: 50},
  {time: '12:00-13:00', value: 30},
  {time: '13:00-14:00', value: 70},
]

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(
      <View title="消费时间段" inlineBlock>
        <Chart data={data} position={['time', 'value']} alias={{time: '时间段', value: '消费额'}} />
      </View>,
    )
    const element = wrapper.getByText('消费时间段')
    expect(element).toBeInTheDocument()
  })
})
// test('test common matcher', () => {
//   expect(2 + 2).toBe(4)
//   expect(2 + 2).not.toBe(5)
// })
