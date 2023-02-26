import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Pokemon = {
  id: number;
  name: string;
  nickname: string;
  isPartner?: boolean;
};

type Save = {
  isGameStart: boolean;
  name: string;
  playTime: number;
  pokemons: Pokemon[];
};

const initialState: Save = {
  isGameStart: false,
  name: "",
  playTime: 0,
  pokemons: [],
};

const reducers: SliceCaseReducers<Save> = {
  setName: (state, action: PayloadAction<string>) => {
    state.name = action.payload;
  },
  addPlayTime: (state, action: PayloadAction<number>) => {
    state.playTime = state.playTime + action.payload;
  },
  setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...action.payload];
  },
  gameStart: (state) => {
    state.isGameStart = true;
  },
};

export const saveSlice = createSlice<Save, SliceCaseReducers<Save>>({
  name: "save",
  initialState,
  reducers,
});

export const { setName, addPlayTime, setPokemons, gameStart } =
  saveSlice.actions;

export const selectPlayer = (state: RootState) => state.save;

export default saveSlice.reducer;
