import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = MyTerminal.ComponentOutputType
import { yiyan } from './yiyanApi'

/**
 * 获取一言命令
 */
const yiyanCommand: CommandType = {
  func: 'yiyan',
  name: '每日一言',
  alias: [],
  params: [],
  options: [],
  async action(options, terminal) {
    const res: any = await yiyan()
    if (res?.code === 0) {
      terminal.writeTextSuccessResult(`${res.data}`)
    } else {
      terminal.writeTextErrorResult(res?.message ?? '获取失败')
    }
  }
}

export default yiyanCommand
