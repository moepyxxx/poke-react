import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Pokemon } from "./saveSlices";

type LocalData = {
  pokemons: Pokemon[];
};
const initialState: LocalData = {
  pokemons: [],
};

const reducers: SliceCaseReducers<LocalData> = {
  setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...action.payload];
  },
  addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
    state.pokemons = [...state.pokemons, ...action.payload];
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

export const { setPokemons, addPokemons } = localDataSlice.actions;

export const selectLocalData = (state: RootState) => state;

export default localDataSlice.reducer;
