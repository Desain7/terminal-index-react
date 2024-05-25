import { useState } from "react";
import { useAppSelector } from "@/store";
import { commandMap } from "@/core/commandRegister";
import _, { trim } from "lodash";
import { getUsageStr } from "@/core/commands/terminal/help/helpUtils";

/**
 * 命令提示 hook
 */
const useHint = () => {
  const [hint, setHint] = useState("");
  const configStore = useAppSelector((state) => state.config);
  const { showHint } = configStore;
  const toSetHint = (inputText: string) => {
    // 未开启提示
    if (!showHint) {
      return;
    }
    if (!inputText) {
      setHint("");
      return;
    }
    const args = trim(inputText).split(" ");
    // 统一小写
    let func = args[0].toLowerCase();
    // 前缀匹配
    const likeKey = Object.keys(commandMap).filter((key) =>
      key.startsWith(func)
    )[0];
    let command = commandMap[likeKey];
    if (!command) {
      setHint("");
      return;
    }
    // 子命令提示
    if (
      command.subCommands &&
      Object.keys(command.subCommands).length > 0 &&
      args.length > 1
    ) {
      setHint(getUsageStr(command.subCommands[args[1]], command));
    } else {
      setHint(getUsageStr(command));
    }
  };

  /**
   * 输入提示防抖
   */
  const debounceSetHint = _.debounce(function (inputText: string) {
    toSetHint(inputText);
  }, 500);
  // const debounceSetHint = (inputText: string) => {
  //   console.log(inputText, 12);
  //   toSetHint(inputText);
  // };

  return {
    hint,
    setHint,
    toSetHint,
    debounceSetHint,
  };
};

export default useHint;
