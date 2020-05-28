## 瀑布流核心库

瀑布流分组，根据高度均分数组数据。

### 安装和使用

```
npm install react-native-fs --save
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

数据分组方法，`data`要求必须是数组。