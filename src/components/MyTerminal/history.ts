import { useState } from "react";
import CommandOutputType = MyTerminal.CommandOutputType;
import CommandInputType = MyTerminal.CommandInputType;

/**
 * 查看历史功能
 * @param commandList
 * @param inputCommand
 */
const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: CommandInputType
) => {
  /**
   * 当前查看的命令位置
   */
  const [commandHistoryPos, setCommandHistoryPos] = useState(
    commandList.length
  );

  const listCommandHistory = () => {
    return commandList;
  };

  const showNextCommand = () => {
    console.log(commandHistoryPos, commandList, inputCommand);
    if (commandHistoryPos < commandList.length - 1) {
      setCommandHistoryPos(commandHistoryPos + 1);
      inputCommand.text = commandList[commandHistoryPos].text;
    } else if (commandHistoryPos === commandList.length - 1) {
      setCommandHistoryPos(commandHistoryPos + 1);
      inputCommand.text = "";
    }
  };

  const showPrevCommand = () => {
    console.log(commandHistoryPos, commandList, inputCommand);
    if (commandHistoryPos >= 1) {
      setCommandHistoryPos(commandHistoryPos - 1);

      inputCommand.text = commandList[commandHistoryPos].text;
    }
  };

  return {
    commandHistoryPos,
    setCommandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand,
  };
};

export default useHistory;
