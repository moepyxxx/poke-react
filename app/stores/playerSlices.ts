import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Partner = {
  id: number;
  name: string;
  nickName: string;
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

const fallbackState: Player = {
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
    if (!state) {
      state = {
        ...fallbackState,
        playTime: action.payload,
      };
      return;
    }
    state.playTime = action.payload;
  },
  setPartner: (state, action: PayloadAction<Partner | null>) => {
    if (!state) {
      state = {
        ...fallbackState,
        partner: action.payload,
      };
      return;
    }
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
