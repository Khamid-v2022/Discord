import { createSlice } from "@reduxjs/toolkit";

export const userInfo = createSlice({
  name: "userinfo",
  initialState: {
    isLogin: false,
    userInfo: {
        avatar: "",
        banDuration: "",
        banner: null,
        created_at: "",
        discriminator: "",
        email: "",
        last_logged_at: "",
        marketing_email: false,
        notify_email: false,
        refresh: "",
        role: "",
        status: "",
        userid: "",
        username: "",
        __v: 0,
        _id: ""
    }
  },
  reducers: {
    updateUserinfo: (state, action) => {
      const userInfo = action.payload;

      //   chaning values
      state.isLogin = userInfo.isLogin;
      state.userInfo = userInfo.userInfo;
    },
  },
});

export const { updateUserinfo } = userInfo.actions;
export default userInfo.reducer;