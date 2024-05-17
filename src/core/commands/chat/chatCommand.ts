import { CommandType } from '../../command'
import CodeOutputType = MyTerminal.CodeOutputType
import { chat } from './chatApi'
import chatAnal from '../../../utils/chatConAnal'

/**
 * chatGPT聊天命令
 */
const chatCommand: CommandType = {
  func: 'chat',
  name: '聊天(需配置token)',
  alias: [],
  params: [
    {
      key: 'sentence',
      desc: '对话的内容',
      required: true
    }
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }
    const con = _[0]
    const message = con
    const res: any = await chat(message)
    console.log('gpt', res)
    if (res?.code === 0) {
      terminal.writeTextSuccessResult('chatgpt:')
      let chatCon = chatAnal(res.data)
      for (let i = 0; i < chatCon.length; i++) {
        if (chatCon[i].type == 'code') {
          const output: CodeOutputType = {
            type: 'code',
            code: chatCon[i].content
          }

          terminal.writeResult(output)
        } else {
          terminal.writeTextResult(` ${chatCon[i].content}`)
        }
      }
    } else {
      // terminal.writeTextErrorResult(res?.message ?? '对话失败')
      terminal.writeTextErrorResult('服务暂时不可用~')
    }
  }
}

export default chatCommand
