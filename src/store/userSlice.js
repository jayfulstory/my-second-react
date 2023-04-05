import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    changeName(state) {
      state.name = 'lee';
    },
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});
export const { changeName, increaseAge } = user.actions;

export default user;
