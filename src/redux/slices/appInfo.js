import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, 
  homeTabNav : null
};
const appSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {   
    setLoggedStatus(state, action) {
      state.isLoggedIn = action.payload; 
    },
    setHomeTabNav(state, action) {
      state.homeTabNav = action.payload; 
    },
  },
});
export const {
  setLoggedStatus,
  setHomeTabNav
} = appSlice.actions;
export default appSlice.reducer;
