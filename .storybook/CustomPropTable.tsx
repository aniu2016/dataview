import React from 'react'
import {storiesOf} from '@storybook/react'
const Red = (
  props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>,
) => <span style={{color: 'red'}} {...props} />

export interface Prop {
  propType?: any
  description?: string
  defaultValue?: any
}

export interface Props {
  [propName: string]: Prop | false
}

const TableComponent = (props: Props) => ({propDefinitions}: {propDefinitions: any}) => {
  // 这里写个业务逻辑，给所有Chart组件的options定义全局的propType
  props.options = props.options || {
    propType: 'ChartCfg {}',
  }

  const propsTable = propDefinitions.map(({property, propType, required, description, defaultValue}: any) => {
    let customProp: Prop | false = props[property]
    // 定义不显示
    if (customProp === false) {
      return ''
    }

    debugger
    customProp = customProp || {}

    return (
      <tr key={property}>
        <td className="info-table-monospace">
          {property}
          {required ? <Red>*</Red> : null}
        </td>
        <td className="info-table-monospace">{customProp.propType || propType.name}</td>
        <td>{customProp.defaultValue || defaultValue}</td>
        <td>{customProp.description || description}</td>
      </tr>
    )
  })

  return (
    <table className="info-table">
      <thead>
        <tr>
          <th>property</th>
          <th>propType</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{propsTable}</tbody>
    </table>
  )
}

export default TableComponent
