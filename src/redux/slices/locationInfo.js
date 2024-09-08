import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  latitude: 41.3317187,
  longitude: 19.8437172,
  address: null,
  isLocationPermited : false,
};
 

const locationSlice = createSlice({
  name: 'locationInfo',
  initialState,
  reducers: {
    setLocation(state, action) {
      const {latitude, longitude, address} = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.address = address;
    },
    setPermitLocation(state, action) {
      state.isLocationPermited = action.payload;
    },
  },
});
export const {setLocation, setPermitLocation} = locationSlice.actions;
export default locationSlice.reducer;
