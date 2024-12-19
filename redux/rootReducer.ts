import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";
import cartReducer from "@/redux/features/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
