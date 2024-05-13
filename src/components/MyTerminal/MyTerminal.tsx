"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useAppSelector } from "@/store";
import CommandOutputType = MyTerminal.CommandOutputType;
import OutputType = MyTerminal.OutputType;
import CommandInputType = MyTerminal.CommandInputType;
import TerminalType = MyTerminal.TerminalType;
import TextOutputType = MyTerminal.TextOutputType;
import OutputStatusType = MyTerminal.OutputStatusType;
import type { CollapseProps } from "antd";
import { Collapse, Input } from "antd";

// import "./antdStyle.less";

// TODO: 重写组件样式

function MyTerminal(
  props: {
    height?: string | number;
    fullScreen?: boolean;
    // user?: UserType;

    onSubmitCommand?: (inputText: string) => void;
  } = {
    height: "400px",
    fullScreen: false,
    // user: LOCAL_USER as any
  }
) {
  // const { user } = toRefs(props);

  // // 终端实例对象
  // const terminalRef = ref();
  // // 控制折叠
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  // // 输出列表
  const [outputList, setOutputList] = useState<OutputType[]>([]);
  // // 命令列表
  const [commandList, setCommandList] = useState<CommandOutputType[]>([]);
  // // 命令输入框实例对象
  // const commandInputRef = ref();

  // // 命令是否运行
  const [isRunning, setIsRunning] = useState(false);

  // // 引入终端配置状态
  const configStore = useAppSelector((state) => state.config);

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
  console.log(mainStyle);
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

  // 折叠面板 Items
  // const [collapseItems, setCollapseItems]: CollapseProps["items"] = useState([
  //   {
  //     key: "1",
  //     label: "This is panel header 1",
  //     children: <p>{123}</p>,
  //   },
  // ]);

  function handleClickWrapper(event: Event): void {
    //@ts-ignore
    if (event.target.className === "terminal") {
      // focusInput();
    }
  }
  return (
    <div
      className="terminal-wrapper"
      style={wrapperStyle}
      onClick={() => handleClickWrapper(e)}
    >
      <div className="terminal" style={mainStyle}>
        <Collapse
          activeKey={activeKeys}
          bordered={false}
          expand-icon-position="right"
        >
          {/* {outputList.forEach(() => (
            <Fragment></Fragment>
          ))} */}
        </Collapse>
        <div className="terminal-row">
          <span className="commant-input-prompt">
            <Input className="command-input"></Input>
          </span>
        </div>
        {/* 输入提示 */}
        {!isRunning ? <div className="terminal-row"></div> : null}
        {/* <div style={{margin-bottom: '16px'}} /> */}
      </div>
    </div>
  );
}

export default MyTerminal;
