import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';
import { useState } from 'react';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    updateCount(state, action) {
      const { id, type } = action.payload;
      const index = state.findIndex(obj => obj.id == id);
      if (type == 'add') {
        state[index].count += 1;
      } else if (type == 'subtract' && state[index].count > 0) {
        state[index].count -= 1;
      } else if (type == 'delete') {
        const result = state.filter(obj => obj.id != id);
        return result;
      }
    },
    toCart(state, action) {
      let index = state.findIndex(obj => obj.id == action.payload.id);
      if (index == -1) {
        state.push({ ...action.payload, count: 1 });
      } else {
        state[index].count += 1;
      }
    },
  },
});
export const { updateCount, toCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
