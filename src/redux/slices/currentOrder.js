import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentOrder: null,
  orderStatus: 0,
};
const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload;
    },
  },
});
export const {setCurrentOrder, setOrderStatus} = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
