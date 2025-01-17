import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  slug: string;
  title: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.slug === action.payload.slug && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ slug: string; size: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.slug === action.payload.slug &&
            item.size === action.payload.size
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ slug: string; size: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.slug === action.payload.slug && item.size === action.payload.size
      );

      if (item) {
        item.quantity = Math.max(action.payload.quantity, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
