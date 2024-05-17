import { CommandType } from "../../../command";
import ComponentOutputType = MyTerminal.ComponentOutputType;
import React from "react";

/**
 * 快捷键命令
 */
const shortcutCommand: CommandType = {
  func: "shortcut",
  name: "快捷键",
  desc: "查看快捷键",
  alias: [],
  params: [],
  options: [],
  collapsible: true,
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: "component",
      component: React.lazy(() => import("./ShortcutBox")),
    };
    terminal.writeResult(output);
  },
};

export default shortcutCommand;
