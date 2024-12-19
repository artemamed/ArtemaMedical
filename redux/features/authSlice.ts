import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  avatarUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  isAuthenticated: false,
  avatarUrl: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state: AuthState,
      action: PayloadAction<{
        email: string;
        token: string;
        avatarUrl: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
      }>
    ) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.avatarUrl = action.payload.avatarUrl;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
    },
    clearAuth(state: AuthState) {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      state.avatarUrl = null;
      state.firstName = null;
      state.lastName = null;
      state.phoneNumber = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
