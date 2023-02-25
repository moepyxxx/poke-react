import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import playerReducer from "./playerSlices";
import playTimerReducer from "./playTimerSlices";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playTimer: playTimerReducer,
  },
  preloadedState: load({
    states: ["player"],
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({
        states: ["player"],
      })
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
