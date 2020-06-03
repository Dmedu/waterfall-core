## 瀑布流核心库

瀑布流分组，根据高度均分数组数据。

### Installation and usage

```
npm install waterfall-core --save
```

```js
import { WaterfallGroup } from 'waterfall-core'

let group = new WaterfallGroup(options)
let listData = [
  { height:1 },
  { height:2 },
  { height:3 },
  { height:4 },
  { height:5 },
  { height:6 },
  { height:7 },
  { height:8 },
  { height:9 }
]

group.dataGroup(listData).then(groupArr => {
  /**
   * [
   *  [ {height:1}, {height:4}, {height:7} ],
   *  [ {height:2}, {height:5}, {height:8} ],
   *  [ {height:3}, {height:6}, {height:9} ]
   * ]
  */
  console.log(groupArr)
})
```

### param

- `options`

```js
options = {
  colNum:number  //数据分几组（瀑布流列数）
}
```
### method

- `dataGroup(data:Array):Promise<void>`

调用dataGroup方法进行分组计算，返回计算后的分组。

> 注意：data类型为数组，且值类型为对象:`{ height:number }`

## 作者

[Ethan zhang](https://dmedu.github.io/EthanZhang.me/)