import React, { Fragment, useEffect, useState } from "react";
import { CommandType } from "@/core/command";
import { getOptionKeyList, getUsageStr } from "./helpUtils";

interface HelpBoxProps {
  command: CommandType;
  parentCommand: CommandType;
}

function CommandHelpBox(props: HelpBoxProps) {
  const { command, parentCommand } = props;
  let [usageStr, setUsageStr] = useState("");
  useEffect(() => {
    setUsageStr(getUsageStr(command, parentCommand));
  }, [command, parentCommand]);
  return (
    <div>
      <div>命令：{command.name}</div>
      {command.desc && <div>介绍：{command.desc}</div>}
      {command.alias && command.alias.length > 0 && (
        <div>别名：{command.alias.join(",")}</div>
      )}
      <div>用法：{usageStr}</div>
      {command.subCommands && Object.keys(command.subCommands).length > 0 && (
        <Fragment>
          <div>子命令：</div>
          <ul className="mb-0">
            {command.subCommands.map((subCommand, index) => {
              return (
                <li key={index}>
                  {subCommand.func}
                  {subCommand.name}
                  {subCommand.desc}
                </li>
              );
            })}
          </ul>
        </Fragment>
      )}
      {command.params && command.params.length > 0 && (
        <Fragment>
          <div>参数：</div>
          <ul className="mb-0">
            {command.params.map((param, index) => {
              return (
                <li key={index}>
                  {param.key}
                  {param.required ? "必填" : "可选"}
                  {param.defaultValue ? `默认：${param.defaultValue}` : ""}
                  {param.desc}
                </li>
              );
            })}
          </ul>
        </Fragment>
      )}
      {command.options && command.options.length > 0 && (
        <Fragment>
          <div>选项：</div>
          <ul className="mb-0">
            {
              command.options.map((option, index) => {
                return (
                  <li key={index}>
                    {getOptionKeyList(option).join(" ")}
                    {option.required ? "必填" : "可选"}
                    {option.defaultValue ? `默认：${option.defaultValue}` : ""}
                    {option.desc}
                  </li>
                );
              }) as any
            }
          </ul>
        </Fragment>
      )}
    </div>
  );
}

export default CommandHelpBox;
