import { unref } from '@vue/reactivity'
import { defineAsyncComponent } from 'vue'
import { CommandType } from '../../../command'
import { useCodeStore } from '../codeStore'
import CodeSnippetType = Code.CodeSnippetType
import ComponentOutputType = MyTerminal.ComponentOutputType

const codeEditor = unref(
  defineAsyncComponent(() => import('../codeEditor.vue'))
)

/**
 * 添加代码片段命令
 */
const addCommand: CommandType = {
  func: 'add',
  name: '添加代码片段',
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: codeEditor
    }
    terminal.writeResult(output)
    const { codeSnippet } = useCodeStore()
    // if (res) {
    //   terminal.writeTextSuccessResult('添加代码片段成功')
    // } else {
    //   terminal.writeTextErrorResult('操作失败')
    // }
  }
}

export default addCommand
