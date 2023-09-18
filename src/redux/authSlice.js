import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
  user: { name: "", email: "", uid: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user.email = action.payload.email;
      state.user.name = action.payload.displayName;
      state.user.uid = action.payload.uid;
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      console.log("authState:", state);
    },
    logOut(state) {
      state.user.email = "";
      state.user.name = "";
      state.user.uid = null;
      state.isLoggedIn = false;
      state.token = null;
      console.log("authState:", state);
    },
  },
});

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.user.email;
export const selectName = (state) => state.auth.user.name;
export const selectId = (state) => state.auth.user.uid;

export const { setUser, logOut } = authSlice.actions;
