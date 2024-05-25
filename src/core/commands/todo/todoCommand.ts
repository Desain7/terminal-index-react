import { CommandType } from "../../command";
import ComponentOutputType = MyTerminal.ComponentOutputType;
import addCommand from "./subCommands/addCommand";
import React from "react";

/**
 * 待办事项命令
 */
const todoCommand: CommandType = {
  func: "todo",
  name: "待办事项",
  desc: "记录和管理任务",
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
  },
  collapsible: true,
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: React.lazy(() => import("./TodoBox")),
      };
      terminal.writeResult(output);
      return;
    }
  },
};

export default todoCommand;
