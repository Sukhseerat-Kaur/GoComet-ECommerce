import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import cartSlice from './slices/Cartslice';
import whishlistSlice from './slices/whishlistSlice';
import showCartSlice from './slices/showCartSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    wishlist: whishlistSlice,
    showCart: showCartSlice,
  },
});

export default store;
