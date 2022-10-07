import { createSlice } from "@reduxjs/toolkit";

export const guidepopup = createSlice({
  name: "guidepopup",
  initialState: {
    isOpen: false,
  },
  reducers: {
    update: (state) => {
      state.isOpen = state.isOpen ? false : true;
    },
  },
});

export const { update } = guidepopup.actions;
export default guidepopup.reducer;