/**
 * 瀑布流分组
 * @constructor
 * @param { object } options 参数 { colNum:2, data:[] }
 * @param { number } colNum 分几组
 * @param { Array } data 要分组的数据 [{1},{2}...]
 * @author Ethan zhang
 * Email: 610558983@qq.com
 * wx: 610558983
 * github: https://github.com/Dmedu
 * 2020/04/25
 */

class WaterfallGroup {
  constructor(options) {
    this.colNum = options.colNum || 2
    this.eachColumnHeightsSet = new Array(options.colNum)
    this.afterGroup = new Array(options.colNum)
  }
  /**
   * @method 数据分组
   * @param { Array } data 要分组的数据
   * @returns [ [{1},{2}], [{3},{4}], [{5},{6}] ]
   */
  dataGroup(data) {
    return new Promise((resolve, reject) => {
      if (
        data &&
        data.length &&
        Array.isArray(data)
      ) {
        this.afterGroupInitV(data).then( async listData => {
          for (let i = 0; i < listData.length; i++) {
            let idx = await this.arrayMaxIdx(this.eachColumnHeightsSet)
            await this.addDataToAfterGroup(idx, listData[i])
          }
          resolve(this.afterGroup)
        })
      }else{
        console.warn(
          'Warn -> ',
          'The data type must be an array'
        )
        reject(false)
      }
    })
  }
  /**
   * @method 给分组赋初始值
   * @param { Array } data 要分组的数据
   */
  afterGroupInitV(data) {
    return new Promise((resolve, reject) => {
      if (data.length) {
        for (let i = 0; i < this.colNum; i++) {
          if (!this.afterGroup[i]) {
            this.afterGroup[i] = []
            this.addDataToAfterGroup(i, data[i])
          } else {
            console.warn(
              'Warn -> ',
              this.afterGroup[i] + ':The initial value of the group already exists'
            )
            break
          }
        }
        data.splice(0, this.colNum)
        resolve(data)
      } else {
        reject(false)
      }
    })
  }
  /**
   * @method 更新某一组集合的高度
   * @param { number } idx 组下标
   * @param { number } v 更新的值
   */
  updateEachSetHeights(idx, v) {
    console.log(idx)
    console.log(v)
    this.eachColumnHeightsSet[idx] = v
    console.log(this.eachColumnHeightsSet)
  }
  /**
   * @method 添加新的数据到分组数据
   * @param { number } groupIndex 组下标 
   * @param { object } data 入组的数据
   */
  addDataToAfterGroup(groupIndex, data) {
    console.log(groupIndex)
    if (
      typeof Number(groupIndex) === 'number' &&
      data instanceof Object
    ) {
      this.afterGroup[groupIndex].push(data)
      console.log(this.afterGroup[groupIndex])
      this.arraySum(this.afterGroup[groupIndex]).then(res => {
        if (res) {
          console.log(res)
          this.updateEachSetHeights(groupIndex, res)
        }
      })
    } else {
      console.error(
        'Error -> ',
        'Please check the data type'
      )
    }
  }
  /**
   * @method 数组求和
   * @param { Array } arr 数组 [{height:1}, {height:2}, {height:3},...]
   * @returns 数组的和 6
   */
  arraySum(arr) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(arr)) {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].height &&
            typeof arr[i].height === 'number'
          ) {
            sum += arr[i].height
          } else {
            console.error(
              'Error -> ',
              arr[i] + 'is an object containing the field "height"'
            )
            break
          }
        }
        resolve(sum)
      } else {
        console.error(
          'Error -> ',
          'Please check the data type'
        )
        reject(false)
      }
    })
  }
  /**
   * @method 查找数组中的最大值返回下标
   * @param { Array } arr 数组 [1, 2, 3,...]
   * @returns 2
   */
  arrayMaxIdx(arr) {
    console.log(arr)
    if (
      Array.isArray(arr) &&
      arr.length
    ) {
      let min = arr[0]
      let index = 0
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        if (
          typeof arr[i] === 'number' &&
          min >= arr[i]
        ) {
          min = arr[i]
          index = i
        }
      }
      return index
    } else {
      console.error(
        'Error -> ',
        'The array is empty or the data type is incorrect'
      )
    }
  }
}

export default WaterfallGroup