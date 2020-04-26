import React from 'react'
import {render} from '@testing-library/react'
import View from './view'

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<View title="Nice title">Nice</View>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
  })
})
