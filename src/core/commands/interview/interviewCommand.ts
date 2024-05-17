import { CommandType } from '../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = MyTerminal.ComponentOutputType

const newsCommand: CommandType = {
  func: 'interview',
  name: '面经',
  alias: [],
  params: [],
  options: [],
  collapsible: true,
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./NewsBox.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default newsCommand
