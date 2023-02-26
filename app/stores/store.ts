import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import saveReducer from "./saveSlices";
import localReducer from "./localDataSlices";

export const store = configureStore({
  reducer: {
    save: saveReducer,
    local: localReducer,
  },
  preloadedState: load({
    states: ["save"],
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({
        states: ["save"],
      })
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
