import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoggin : false,
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    setCurrentUser: (state, actions) => {
      state.user = actions.payload;
    },
    setIsLoggin : (state ,actions) => {
      state.isLoggin = actions.payload
    }
  },
});



const rootReducer = combineReducers({
  profile : profileSlice.reducer
});

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["profile"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export const { setToken, setCurrentUser, setIsLoggin} = profileSlice.actions;


export const persistor = persistStore(store);
