import { unref } from '@vue/reactivity'
import { defineAsyncComponent, toRefs } from 'vue'
import { CommandType } from '../../../command'
import { useCodeStore } from '../codeStore'
import CodeSnippetType = Code.CodeSnippetType
import ComponentOutputType = MyTerminal.ComponentOutputType

const codeBox = unref(defineAsyncComponent(() => import('../codeBox.vue')))

/**
 * 搜索代码片段命令
 */
const getCommand: CommandType = {
  func: 'get',
  name: '搜索代码片段',
  options: [],
  action(options, terminal) {
    const { _ } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }
    const name = _[0]
    const output: ComponentOutputType = {
      type: 'component',
      component: codeBox,
      props: {
        name
      }
    }
    terminal.writeResult(output)
    // const { codeSnippet } = useCodeStore()
    // if (res) {
    //   terminal.writeTextSuccessResult('添加代码片段成功')
    // } else {
    //   terminal.writeTextErrorResult('操作失败')
    // }
  }
}

export default getCommand
