import React from 'react'
import {storiesOf} from '@storybook/react'

const markdownText = `
&nbsp;
### 介绍
&nbsp;

DataView 是一个基于Antv/G2的可视化数据组件库，意在简单快捷高效，无需了解Antv/G2如何使用，即可直接使用的的可视化数据组件库

&nbsp;
### 安装
&nbsp;

~~~javascript
npm install dataview -S
~~~

&nbsp;
### 使用
&nbsp;

~~~javascript
import { View, ColumnChart } from 'dataview'
import 'dataview/lib/index.css'
~~~

&nbsp;
### 特性
&nbsp;

* 🌈 提炼各项目通用可视化数据组件
* 📦 开箱即用，简单高效
* 🛡 使用 TypeScript 开发，提供完整的类型定义文件
* 🎨 随时给组件库添加Chart组件，不存在缺组件少组件的情况
`
storiesOf('DataView', module).add(
  'welcome',
  () => {
    return <h2>欢迎来到 DataView 组件库</h2>
  },
  {info: {text: markdownText, source: false}},
)
