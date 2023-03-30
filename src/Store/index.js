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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});


const rootReducer = combineReducers({
  profile : profileSlice.reducer,
  cart : cartSlice.reducer
});

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["profile" ,"cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export const { setToken, setCurrentUser, setIsLoggin} = profileSlice.actions;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

export const persistor = persistStore(store);
