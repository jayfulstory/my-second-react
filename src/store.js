import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    add(state, action) {
      const index = state.findIndex(obj => obj.id == action.payload);
      state[index].count += 1;
    },
    toCart(state, action) {
      const index = state.findIndex(obj => obj.id == action.payload);
      console.log(index);
      if (index == -1) {
        state.push({ ...action.payload, count: 1 });
      } else {
        state[index].count += 1;
      }
    },
  },
});
export const { add, toCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
