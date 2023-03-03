import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Pokemon } from "./saveSlices";

type LocalData = {
  pokemons: Pokemon[];
  playTime: number;
  setPlayTime: number;
};
const initialState: LocalData = {
  pokemons: [],
  playTime: 0,
  setPlayTime: 0,
};

const reducers: SliceCaseReducers<LocalData> = {
  setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...action.payload];
  },
  addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...state.pokemons, ...action.payload];
  },
  setPlayTime: (state, action: PayloadAction<number>) => {
    state.playTime = action.payload;
  },
  setStartPlayTime: (state, action: PayloadAction<number>) => {
    state.setPlayTime = action.payload;
  },
};

export const localDataSlice = createSlice<
  LocalData,
  SliceCaseReducers<LocalData>
>({
  name: "local",
  initialState,
  reducers,
});

export const { setPokemons, addPokemons, setPlayTime, setStartPlayTime } =
  localDataSlice.actions;

export const selectLocalData = (state: RootState) => state;

export default localDataSlice.reducer;
