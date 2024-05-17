import { useState } from "react";
import { useAppSelector } from "@/store";
import { trim } from "lodash";

/**
 * 命令提示 hook
 */
const useHint = (inputText: string) => {
  const [hint, setHint] = useState("");
  const configStore = useAppSelector((state) => state.config);
  const { showHint } = configStore;
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
};
