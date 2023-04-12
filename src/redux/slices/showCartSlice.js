import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

const showCartSlice = createSlice({
  name: 'showCart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.value = !state.value;
    },
  },
});

export const { toggleCart } = showCartSlice.actions;
export default showCartSlice.reducer;
