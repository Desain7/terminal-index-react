"use client";
import MyTerminal from "@/components/MyTerminal/MyTerminal";
import { doCommandExecute } from "@/core/commandExecutor";
import { Fragment, useEffect, useRef } from "react";

export default function Home() {
  const terminalRef = useRef();
  // console.log("terminal", terminalRef);

  const onSubmitCommand = async (inputText: string) => {
    if (!inputText) {
      return;
    }
    // console.log("onSubmitCommand", inputText);
    const terminal = terminalRef.current;
    await doCommandExecute(inputText, terminal);
  };

  return (
    <Fragment>
      {" "}
      <MyTerminal
        ref={terminalRef}
        fullScreen={true}
        onSubmitCommand={onSubmitCommand}
      ></MyTerminal>
      <div className="fixed bottom-2 right-2">
        <a
          href="https://beian.miit.gov.cn/"
          className="text-blue-600 cursor-pointer transition-colors duration-300"
          target="_blank"
        >
          赣ICP备2022002254号-2
        </a>
      </div>
    </Fragment>
  );
}
