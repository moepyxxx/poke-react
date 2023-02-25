import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Pokemon = {
  id: number;
  name: string;
  nickname: string;
  isPartner?: boolean;
};

type Player = {
  isSet: boolean;
  name: string;
  playTime: number;
  pokemons: Pokemon[];
};

const initialState: Player = {
  isSet: false,
  name: "",
  playTime: 0,
  pokemons: [],
};

const reducers: SliceCaseReducers<Player> = {
  setName: (state, action: PayloadAction<string>) => {
    state.name = action.payload;
    state.isSet = true;
  },
  setPlayTime: (state, action: PayloadAction<number>) => {
    state.playTime = action.payload;
  },
  addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...state.pokemons, ...action.payload];
  },
};

export const partnerSlice = createSlice<Player, SliceCaseReducers<Player>>({
  name: "player",
  initialState,
  reducers,
});

export const { setName, setPlayTime, setPartner, addPokemons } =
  partnerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default partnerSlice.reducer;
