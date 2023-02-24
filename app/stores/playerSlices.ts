import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Partner = {
  id: number;
  name: string;
  nickname: string;
};

type Player = {
  isSet: boolean;
  name: string;
  playTime: number;
  partner: Partner | null;
};

const initialState: Player = {
  isSet: false,
  name: "",
  playTime: 0,
  partner: null,
};

const reducers: SliceCaseReducers<Player> = {
  setName: (state, action: PayloadAction<string>) => {
    state.name = action.payload;
    state.isSet = true;
  },
  setPlayTime: (state, action: PayloadAction<number>) => {
    state.playTime = action.payload;
  },
  setPartner: (state, action: PayloadAction<Partner | null>) => {
    state.partner = action.payload;
  },
};

export const partnerSlice = createSlice<Player, SliceCaseReducers<Player>>({
  name: "player",
  initialState,
  reducers,
});

export const { setName, setPlayTime, setPartner } = partnerSlice.actions;

export const selectPartner = (state: RootState) => state.player;

export default partnerSlice.reducer;
