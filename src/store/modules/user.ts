import { getLoginUser } from "@/core/commands/user/userApi";
import { LOCAL_USER } from "@/core/commands/user/userConstant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  loginUser: any;
  jwtToken: string;
}

const initialState: UserState = {
  loginUser: {
    ...LOCAL_USER,
  },
  jwtToken: "",
};

export const fetchRecommendDataAction = createAsyncThunk(
  "userdata",
  (_, { dispatch }) => {
    getLoginUser().then((res) => {
      if (res?.code === 0 && res.data) {
        dispatch(changeLoginUserAction(res.data));
      }
    });
  }
);

// TODO: 持久化

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeLoginUserAction(state, { payload }) {
      state.loginUser = payload;
    },
    changeLocalJWTAction(state, { payload }) {
      state.jwtToken = payload;
    },
    cleanLocalJWTAction(state, { payload }) {
      state.jwtToken = "";
    },
  },
});

export const {
  changeLoginUserAction,
  changeLocalJWTAction,
  cleanLocalJWTAction,
} = userSlice.actions;
export default userSlice.reducer;
