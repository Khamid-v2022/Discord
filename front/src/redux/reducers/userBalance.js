import { createSlice } from "@reduxjs/toolkit";

export const userBalance = createSlice({
  name: "userbalance",
  initialState: {
    purchased: {
      diamonds: 5,
      stars: 47,
    },
    earned: {
      diamonds: 0,
      stars: 0,
    },
  },
  reducers: {
    updateBalance: (state, action) => {
      const balance = action.payload;
      // console.log("action", action);
      // console.log("state", state);

      //   chaning values
      state.purchased = balance.purchased;
      state.earned = balance.earned;
    },
  },
});

export const { updateBalance } = userBalance.actions;
export default userBalance.reducer;