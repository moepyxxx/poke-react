import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Park = {
  isStart: boolean;
  remainBallCount: number;
};

const initialState: Park = {
  isStart: false,
  remainBallCount: 0,
};

const reducers: SliceCaseReducers<Park> = {
  gameStart: (state) => {
    console.log("game start");
    state.isStart = true;
    state.remainBallCount = 20;
  },
  gameEnd: (state) => {
    state.isStart = false;
  },
};

export const parkSlice = createSlice<Park, SliceCaseReducers<Park>>({
  name: "park",
  initialState,
  reducers,
});

export const { gameStart, gameEnd } = parkSlice.actions;

export const selectPark = (state: RootState) => state.player;

export default parkSlice.reducer;
