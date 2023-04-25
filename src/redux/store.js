import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import dataSlice from "./dataSlice";
import thunk from "redux-thunk";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: "root",
  storage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, dataSlice);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});
export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     data: dataSlice,
//     devTools,
//   },
// });
