import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type PlayTimer = {
  value: number;
};
const initialState: PlayTimer = {
  value: 0,
};

const reducers: SliceCaseReducers<PlayTimer> = {
  setPlayTimer: (state, action: PayloadAction<number>) => {
    state.value = state.value + action.payload;
  },
};

export const playTimerSlice = createSlice<
  PlayTimer,
  SliceCaseReducers<PlayTimer>
>({
  name: "playTime",
  initialState,
  reducers,
});

export const { setPlayTimer } = playTimerSlice.actions;

export const selectPlayTimer = (state: RootState) => state;

export default playTimerSlice.reducer;
