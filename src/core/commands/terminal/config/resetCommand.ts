import { CommandType } from "../../../command";
import { resetConfigAction } from "@/store/modules/config";

/**
 * 重置配置
 */
const resetCommand: CommandType = {
  func: "reset",
  name: "重置终端配置",
  alias: [],
  options: [],
  action(options, terminal): void {
    resetConfigAction();
    terminal.writeTextSuccessResult("已重置终端配置");
  },
};

export default resetCommand;
