"use client";
import React, { useEffect, useState, Fragment, useRef, Children } from "react";
import { useAppSelector } from "@/store";
import CommandOutputType = MyTerminal.CommandOutputType;
import OutputType = MyTerminal.OutputType;
import CommandInputType = MyTerminal.CommandInputType;
import TerminalType = MyTerminal.TerminalType;
import TextOutputType = MyTerminal.TextOutputType;
import OutputStatusType = MyTerminal.OutputStatusType;
import UserType = User.UserType;
import type { CollapseProps } from "antd";
import { Button, Collapse, Input } from "antd";
import { TerminalWrapper } from "./cpnStyle";
import { LOCAL_USER } from "@/core/commands/user/userConstant";
import useHint from "./hint";
import useHistory from "./history";
import MyDayjs from "@/plugins/myDayjs";
import { registerShortcuts } from "./shortcuts";
import ContentOutput from "./ContentOutput";

function MyTerminal(
  props: {
    height?: string | number;
    fullScreen?: boolean;
    user?: UserType;

    onSubmitCommand?: (inputText: string) => void;
  } = {
    height: "400px",
    fullScreen: false,
    user: LOCAL_USER as any,
  }
) {
  const { user } = props;

  // 终端实例对象
  const terminalRef = useRef(null);
  // 控制折叠
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  // 输出列表
  const [outputList, setOutputList] = useState<OutputType[]>([]);
  // 命令列表
  const [commandList, setCommandList] = useState<CommandOutputType[]>([]);
  // 命令输入框实例对象
  const commandInputRef = useRef(null);

  // 命令是否运行
  const [isRunning, setIsRunning] = useState(false);

  // 引入终端配置状态
  const configStore = useAppSelector((state) => state.config);

  // 初始命令
  const initCommand: CommandInputType = {
    text: "",
    placeholder: "",
  };

  // 待用户输入的命令
  const [inputCommand, setInputCommand] = useState({ ...initCommand });

  // 全局记录当前的命令，便于写入结果
  // 记录当前命令，便于写入结果
  const [currentNewCommand, setCurrentNewCommand] = useState({});

  useEffect(() => {
    registerShortcuts(terminal);
    const { welcomeTexts } = configStore;
    if (welcomeTexts?.length > 0) {
      welcomeTexts.forEach((welcomeText) => {
        terminal.writeTextOutput(welcomeText);
      });
    } else {
      /**
       * 默认欢迎语
       */
      const title = [
        ` _____                       _                _   _____            _              `,
        `|_   _|                     (_)              | | |_   _|          | |             `,
        `  | |  ___  _ __  _ __ ___   _  _ __    __ _ | |   | |  _ __    __| |  ___ __  __ `,
        `  | | / _ \\ | '__|| '_ \\ _ \\ | || '_ \\  / _ || |   | | | '_ \\  / _  | / /_\\ \\ / /`,
        `  | ||  __/| |   | | | | | || || | | || (_| || |  _| |_| | | || (_| ||  __/ >  <  `,
        `  \\\_/ \\___||_|   |_| |_| |_||_||_| |_| \\__,_||_|  \\___/|_| |_| \\__,_| \\___|/_/\\_\\ `,
      ];

      title.forEach((item) => {
        terminal.writeTextOutput(item.replace(/ /g, "&nbsp;"));
      });
      terminal.writeTextOutput(`Welcome to TerminalIndex!`);
      terminal.writeTextOutput(`输入 help 查看所有命令~ `);
      terminal.writeTextOutput("<br/>");
    }
    setInterval(() => {
      setCurTime(MyDayjs(`${new Date()}`).format("HH:mm:ss"));
    }, 1000);

    console.log("terminal init end");
  }, []);

  // 历史记录 hooks
  const {
    setCommandHistoryPos,
    showPrevCommand,
    showNextCommand,
    listCommandHistory,
  } = useHistory(commandList, inputCommand);

  // hint hooks
  const { hint, toSetHint, debounceSetHint } = useHint();

  //TODO: 提交命令（回车）
  const doSubmitCommand = async () => {
    setIsRunning(true);
    toSetHint("");
    let inputText = inputCommand.text;
    // 执行某条历史命令
    if (inputText.startsWith("!")) {
      const commandIndex = Number(inputText.substring(1));
      const command = commandList[commandIndex - 1];
      if (command) {
        inputText = command.text;
      }
    }
    // 执行命令
    const newCommand: CommandOutputType = {
      text: inputText,
      createTime: curTime,
      type: "command",
      resultList: [],
    };

    setCurrentNewCommand(newCommand);
    console.log("newCommand", newCommand);
    // 执行命令
    await props.onSubmitCommand?.(inputText);
    // 添加输出（为空也要输出换行）
    setOutputList((prevOutputList) => [...prevOutputList, newCommand]);
    // 不为空字符串才算是有效命令
    if (inputText) {
      setCommandList([...commandList, newCommand]);
      // 重置当前要查看的命令位置
      setCommandHistoryPos(commandList.length);
    }
    setInputCommand({ ...initCommand });
    // 默认展开折叠面板
    setActiveKeys([...activeKeys, outputList.length - 1]);
    // 自动滚到底部
    setTimeout(() => {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      console.log(123, terminalRef.scrollTop);
      // 聚焦
      focusInput();
    }, 50);
    setIsRunning(false);
  };

  // 输入框内容改变时，触发输入提示
  useEffect(() => {
    debounceSetHint(inputCommand.text);
  }, [inputCommand.text]);

  // 输入提示符
  const [prompt, setPrompt] = useState("");
  // useEffect(() => {
  //   setPrompt(`${user?.username}`);
  // });

  // 当前时间
  const [curTime, setCurTime] = useState("");

  const [curPrompt, setCurPrompt] = useState("");
  useEffect(() => {
    // ${user!.username}
    setCurPrompt(`[Test ${curTime}]$`);
  }, [curTime]);

  // 终端主样式
  let [mainStyle, setMainStyle] = useState({});
  useEffect(() => {
    const fullScreenStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    setMainStyle(
      props.fullScreen
        ? fullScreenStyle
        : {
            height: props.height,
          }
    );
  }, [props.fullScreen]);
  // console.log(mainStyle);

  // 终端包装类主样式
  let [wrapperStyle, setWrapperStyle] = useState({});
  useEffect(() => {
    const { background } = configStore;
    // TODO: style 类型推断
    const style: any = {
      ...mainStyle,
    };
    if (background.startsWith("http")) {
      style.background = `url(${background})`;
    } else {
      style.background = background;
    }
    style.backgroundSize = "cover";
    setWrapperStyle(style);
  }, [mainStyle, configStore]);

  // 清除所有输出
  const clear = () => {
    setOutputList([]);
  };

  /**
   * 写命令文本结果
   * @param text
   * @param status
   */
  const writeTextResult = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
      text,
      type: "text",
      createTime: curTime,
      status,
    };
    setCurrentNewCommand(
      Object.assign(currentNewCommand, {
        resultList: [...currentNewCommand.resultList, newOutput],
      })
    );
  };

  /**
   * 写文本错误状态结果
   * @param text
   */
  const writeTextErrorResult = (text: string) => {
    writeTextResult(text, "error");
  };

  /**
   * 写文本成功状态结果
   * @param text
   */
  const writeTextSuccessResult = (text: string) => {
    writeTextResult(text, "success");
  };

  /**
   * 写结果
   * @param output
   */
  const writeResult = (output: OutputType) => {
    setCurrentNewCommand(
      Object.assign(currentNewCommand, {
        resultList: [...currentNewCommand.resultList, output],
      })
    );
  };

  /**
   * 立即输出文本
   * @param text
   * @param status
   */
  const writeTextOutput = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
      text,
      type: "text",
      createTime: curTime,
      status,
    };

    setOutputList((prevOutputList) => [...prevOutputList, newOutput]);
    // console.log("writeText", text, outputList, newOutput);
  };

  /**
   * 设置命令是否可折叠
   * @param collapsible
   */
  const setCommandCollapsible = (collapsible: boolean) => {
    setCurrentNewCommand(Object.assign(currentNewCommand, { collapsible }));
  };

  /**
   * 立即输出
   * @param newOutput
   */
  const writeOutput = (newOutput: OutputType) => {
    setOutputList((prevOutputList) => [...prevOutputList, newOutput]);
  };

  /**
   * 输入框聚焦
   */
  const focusInput = () => {
    commandInputRef.current.focus();
  };

  /**
   * 获取输入框是否聚焦
   */
  const isInputFocused = () => {
    return (
      (commandInputRef.current.input as HTMLInputElement) ==
      document.activeElement
    );
  };

  /**
   * 设置输入框的值
   */
  const setTabCompletion = () => {
    if (hint) {
      setInputCommand(
        Object.assign(inputCommand, {
          text: `${hint.split(" ")[0]}${hint.split(" ").length > 1 ? " " : ""}`,
        })
      );
    }
  };

  /**
   * 处理输入
   */

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputCommand((prevInputCommand) => ({
      ...prevInputCommand,
      text: newText,
    }));
  };

  /**
   * 折叠 / 展开所有块
   */
  const toggleAllCollapse = () => {
    // 展开
    if (activeKeys.length === 0) {
      setActiveKeys(
        outputList.map((_, index) => {
          return index;
        })
      );
    } else {
      // 折叠
      setActiveKeys([]);
    }
  };

  /**
   * 操作终端的对象
   */
  const terminal: TerminalType = {
    writeTextResult,
    writeTextErrorResult,
    writeTextSuccessResult,
    writeResult,
    writeTextOutput,
    writeOutput,
    clear,
    focusInput,
    isInputFocused,
    setTabCompletion,
    doSubmitCommand,
    showNextCommand,
    showPrevCommand,
    listCommandHistory,
    toggleAllCollapse,
    setCommandCollapsible,
  };

  // 点击终端
  function handleClickWrapper(event: Event): void {
    //@ts-ignore
    if (event.target.className === "terminal") {
      focusInput();
    }
    console.log("click");
  }

  // 折叠面板 Items
  const [collapseItems, setCollapseItems] = useState([] as any);

  useEffect(() => {
    setCollapseItems(
      outputList
        .filter((output) => output.collapsible)
        .map((output, index) => {
          if (output.collapsible) {
            return {
              key: `${index}`,
              label: output.type === "command" ? output.text : undefined,
              children: (
                <div className="terminal-row">
                  {output.resultList?.map((result, idx) => {
                    return (
                      <div key={idx} className="terminal-row">
                        <ContentOutput output={result}></ContentOutput>
                      </div>
                    );
                  })}
                </div>
              ),
            };
          } else {
            return {};
          }
        })
    );
    console.log("changed", "outlist", outputList);
  }, [outputList]);

  return (
    <TerminalWrapper>
      {" "}
      <div
        className="terminal-wrapper"
        style={wrapperStyle}
        onClick={handleClickWrapper}
      >
        <div ref={terminalRef} className="terminal" style={mainStyle}>
          {/* 可折叠 */}
          <Collapse
            activeKey={activeKeys}
            bordered={false}
            expandIconPosition="end"
            items={collapseItems}
          />
          {/* 不可折叠 */}
          {outputList
            .filter((output) => !output.collapsible)
            .map((output, index) => {
              if (!output.collapsible) {
                return output.type === "command" ? (
                  <Fragment>
                    <div className="terminal-row">
                      <span className="mr-2.5 user-select-none">
                        {`[${prompt} ${output.createTime}]`}
                      </span>
                      <span>{output.text}</span>
                    </div>
                    {output.resultList?.map((result, idx) => {
                      return (
                        <div key={idx} className="terminal-row">
                          <ContentOutput output={result}></ContentOutput>
                        </div>
                      );
                    })}
                  </Fragment>
                ) : (
                  <div className="terminal-row">
                    <ContentOutput output={output}></ContentOutput>
                  </div>
                );
              }
            })}

          <div className="terminal-row">
            <span className="command-input-prompt">{curPrompt}</span>
            <Input
              ref={commandInputRef}
              className="command-input"
              value={inputCommand.text}
              disabled={isRunning}
              placeholder={inputCommand.placeholder}
              autoFocus
              onChange={handleInputChange}
              onPressEnter={doSubmitCommand}
            ></Input>
          </div>

          {/* 输入提示 */}
          {!isRunning && hint ? (
            <div className="terminal-row color-#bbb">hint：{hint}</div>
          ) : null}
          <div className="mb-16" />
        </div>
      </div>
    </TerminalWrapper>
  );
}

export default MyTerminal;
