import { CommandType } from "../../../command";
import ComponentOutputType = MyTerminal.ComponentOutputType;
import React from "react";

/**
 * 摸鱼命令
 *
 */
const moyuCommand: CommandType = {
  func: "moyu",
  name: "摸鱼",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: React.lazy(() => import("./MoYuBox")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default moyuCommand;
