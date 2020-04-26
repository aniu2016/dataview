import React, {FC, createContext} from 'react'
import classNames from 'classnames'

interface BaseViewProps {
  /** 扩展class */
  className?: string
  /** 模块标题 */
  title: string | React.ReactNode
  /** 是否为行内内联元素 */
  inlineBlock?: boolean

  /** 模块标题右侧的功能区域 */
  titleRightSlot?: React.ReactNode
  /** 标题下方的显示区域 */
  headerSlot?: React.ReactNode
  /** MainSlot左侧的显示区域 */
  mainLeftSlot?: React.ReactNode
  /** MainSlot上方的显示区域 */
  mainChartTopSlot?: React.ReactNode
  /** 模块核心内容，可以放图表， * 如果 render children 存在时，则会优先显示 render children */
  mainSlot?: React.ReactNode
}

export const ViewContext = createContext({} as BaseViewProps)

export const View: FC<BaseViewProps> = props => {
  const {className, title, inlineBlock, mainSlot, titleRightSlot, headerSlot, mainChartTopSlot, mainLeftSlot} = props

  // 样式
  const containerClassNames = classNames('dataview__view', className, {
    'inline-block': inlineBlock,
  })
  const titleClassNames = classNames('dataview__view__title')
  const titleLeftClassNames = classNames('dataview__view__title__left')
  const titleRightClassNames = classNames('dataview__view__title__right')
  const headerClassNames = classNames('dataview__view__header')
  const mainClassNames = classNames('dataview__view__main')
  const mainLeftClassNames = classNames('dataview__view__mainleft')
  const mainRightClassNames = classNames('dataview__view__mainright')
  const mainRightTopClassNames = classNames('dataview__view__mainleft__top')
  const mainRightDownClassNames = classNames('dataview__view__mainleft__down')

  return (
    <ViewContext.Provider value={props}>
      <div className={containerClassNames}>
        <div className={titleClassNames}>
          <div className={titleLeftClassNames}>{title}</div>
          <div className={titleRightClassNames}>{titleRightSlot}</div>
        </div>
        <div className={headerClassNames}>{headerSlot}</div>
        <div className={mainClassNames}>
          <div className={mainLeftClassNames}>{mainLeftSlot}</div>
          <div className={mainRightClassNames}>
            <div className={mainRightTopClassNames}>{mainChartTopSlot}</div>
            <div className={mainRightDownClassNames}>{props.children ? props.children : mainSlot}</div>
          </div>
        </div>
      </div>
    </ViewContext.Provider>
  )
}

View.defaultProps = {
  inlineBlock: false,
}

export default View
