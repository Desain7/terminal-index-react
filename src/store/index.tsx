import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual,
} from "react-redux";

import configReducer from "./modules/config";

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

// const state = store.getState()
// type StateType = typeof state

type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const shallowEqualApp = shallowEqual;

export default store;
