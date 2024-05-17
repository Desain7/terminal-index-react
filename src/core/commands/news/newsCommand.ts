import { CommandType } from "../../command";
import ComponentOutputType = MyTerminal.ComponentOutputType;
import React from "react";

const newsCommand: CommandType = {
  func: "news",
  name: "热点新闻",
  alias: [],
  params: [],
  options: [],
  collapsible: true,
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: React.lazy(() => import("./NewsBox")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default newsCommand;
