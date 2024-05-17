/**
 * 解析 chatgptApi 返回的聊天内容
 * 1. 寻找内容中的 ``` 部分，成对的 ``` 表示一个代码块 type 为 code
 */

interface chatContent {
  content: string
  type: 'code' | 'words'
}

const chatAnal = (content: string) => {
  let res: Array<chatContent> = []
  let flag = 0
  let left = 0
  let right = 0
  let str
  while (right != -1) {
    if (content.indexOf('```', left) != -1) {
      right = content.indexOf('```', left)
      flag++
      str = content.slice(left, right)
      left = right + 3
    } else {
      str = content.slice(left)
      right = -1
      flag = 1
    }
    console.log('right', right)
    if (flag % 2 === 1) {
      res.push({
        content: str,
        type: 'words'
      })
    } else {
      res.push({
        content: str,
        type: 'code'
      })
    }
  }
  return res
}

export default chatAnal
