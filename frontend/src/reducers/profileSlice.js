import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userprofile: [],
};

export const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    UPDATE: (state, action) => {
      let data = action.payload;
      if (state.userprofile.length === 0) {
        state.userprofile.push({ ...data });
      }
    },
  },
});

export const { UPDATE } = ProfileSlice.actions;

export default ProfileSlice.reducer;
