import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workMate: false,
  normalUser: true,
};

const userTypeSlice = createSlice({
  name: "userType",
  initialState,
  reducers: {
    setWorkMate(state) {
      state.workMate = true;
      state.normalUser = false;
    },
    setNormalUser(state) {
      state.workMate = false;
      state.normalUser = true;
    },
  },
});

export const { setWorkMate, setNormalUser } = userTypeSlice.actions;
export default userTypeSlice.reducer;