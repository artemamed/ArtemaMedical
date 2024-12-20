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
  avatarUrl: null,  // Changed to null for consistency
  firstName: null,  // Changed to null for consistency
  lastName: null,   // Changed to null for consistency
  phoneNumber: null, // Changed to null for consistency
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
      const { email, token, avatarUrl, firstName, lastName, phoneNumber } = action.payload;
      state.email = email;
      state.token = token;
      state.isAuthenticated = true;
      state.avatarUrl = avatarUrl;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
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
