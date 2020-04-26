import {ChartCfg} from '@antv/g2/lib/interface'

interface dataType {
  [propName: string]: any
}

export interface BaseChartProp<T extends dataType> {
  /** 原始数据 */
  data: T[] // [{a: 1,b: 2},{a:1, b: 2}]
  /** [x,y] 将数据X轴及Y轴取值相应的字段用Array描述，传入的数组中元素对应 Data 对象数组中对象的属性 */
  position: [keyof T, keyof T] // ['a', 'b']
  /** 描述自定义别名的对象，如 {day: '天数', count: '销量'} 其中day必须为 Data对象数组中对象存在的属性*/
  alias?: {
    [K in keyof T]?: string
  } // {'a': "", 'b': ""}
  /** G2 Chart初始化选项，详情参考 https://g2.antv.vision/zh/docs/api/interfaces/chartcfg */
  options?: {
    [P in keyof ChartCfg]?: ChartCfg[P]
  }
}
