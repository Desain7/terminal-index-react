import { CommandType } from "../../command";

import ComponentOutputType = MyTerminal.ComponentOutputType;
import React from "react";

/**
 * 热榜命令
 *
 */
const hotCommand: CommandType = {
  func: "hot",
  name: "热榜",
  alias: [],
  params: [
    {
      key: "热榜类别",
      desc: "要查询的热榜",
      required: false,
    },
  ],
  options: [],
  collapsible: true,
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: React.lazy(() => import("./HotBox")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default hotCommand;
