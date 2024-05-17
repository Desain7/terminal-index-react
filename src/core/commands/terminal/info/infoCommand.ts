import { CommandType } from "../../../command";

import ComponentOutputType = MyTerminal.ComponentOutputType;
import React from "react";

/**
 * 查看网站本身信息命令
 */
const infoCommand: CommandType = {
  func: "info",
  name: "查看本站信息",
  alias: ["author", "about"],
  options: [],
  action(options, terminal): void {
    const output: ComponentOutputType = {
      type: "component",
      component: React.lazy(() => import("./InfoBox")),
    };
    terminal.writeResult(output);
  },
};

export default infoCommand;
