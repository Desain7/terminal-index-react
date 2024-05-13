import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TerminalConfigState {
  background: string;
  showHint: boolean;
  welcomeTexts: Array<string>;
}

const initialState: TerminalConfigState = {
  // 默认背景
  background:
    "https://img1.baidu.com/it/u=2514015760,1515350087&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  // 输入提示
  showHint: true,
  // 终端欢迎语
  welcomeTexts: [] as string[],
  //
};

// TODO: 持久化

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    // 修改背景
    changeBackgroundAction(state, { payload }) {
      if (!payload) {
        return;
      }
      state.background = payload;
    },
    // 设置或反转提示
    changeHintActon(state, { payload }) {
      // 反转提示
      if (!payload) {
        state.showHint = !state.showHint;
      }
      // 设置提示
      if (payload === "on") {
        state.showHint = true;
      } else if (payload === "off") {
        state.showHint = false;
      }
    },
    // 修改终端欢迎语
    changeWelcomeTextsAction(state, { payload }) {
      state.welcomeTexts = payload;
    },
    // 重置配置
    resetConfigAction(state) {
      state = initialState;
    },
  },
});

export const {
  changeBackgroundAction,
  changeHintActon,
  changeWelcomeTextsAction,
} = configSlice.actions;
export default configSlice.reducer;
