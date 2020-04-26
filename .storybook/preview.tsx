import React from 'react'
import {addDecorator, addParameters, configure} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import '../src/styles/index.scss'
import './fixCssBug.css'
import CustomPropTable from './CustomPropTable'

addDecorator(withInfo)
addParameters({
  info: {
    inline: true,
    // 业务将ChartOptions 的 propType 类型修改为 ChartOpt {} 组件
    TableComponent: CustomPropTable({}),
  },
})

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach(fname => allExports.push(req(fname)))
  return allExports
}

configure(loaderFn, module)
