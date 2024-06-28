import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./reducers/profileSlice";

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
