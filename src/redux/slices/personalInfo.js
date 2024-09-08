import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone_number: '',
  profile_img: '',
  birthdate : null,
  id: null,
  unique_id : null,
  delivered: 0,
  rejected: 0,
  status: false,
};
const userSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setProfile(state, action) {
      const {
        name,
        email,
        phone_number,
        profile_img,
        birthdate,
        id,
        delivered,
        rejected,
        status,
        unique_id
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone_number = phone_number;
      state.profile_img = profile_img;
      state.birthdate = birthdate;
      state.delivered = delivered;
      state.rejected = rejected;
      state.unique_id = unique_id;
      if (status === 0) {
        state.status = false;
      } else {
        state.status = true;
      }
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phone_number = action.payload;
    },
    increaseDelivered(state, action) {
      state.delivered = state.delivered + 1;
    },
    increaseRejected(state, action) {
      state.rejected = state.rejected + 1;
    },
    toggleStatus(state) {
      state.status = !state.status;
    },
  },
});
export const {
  setProfile,
  setName,
  setEmail,
  setPhoneNumber,
  increaseDelivered,
  increaseRejected,
  toggleStatus,
} = userSlice.actions;
export default userSlice.reducer;
