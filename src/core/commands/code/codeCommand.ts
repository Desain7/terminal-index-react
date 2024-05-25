import { CommandType } from "../../command";
import ComponentOutputType = MyTerminal.ComponentOutputType;
import addCommand from "./subCommands/addCommand";
import getCommand from "./subCommands/getCommand";

const codeBox = shallowRef(defineAsyncComponent(() => import("./codeBox.vue")));

/**
 * 代码片段命令
 */
const codeCommand: CommandType = {
  func: "code",
  name: "代码片段",
  desc: "存储代码片段",
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  options: [],
  subCommands: {
    add: addCommand,
    get: getCommand,
  },
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: codeBox,
      };
      terminal.writeResult(output);
      return;
    }
  },
};

export default codeCommand;
