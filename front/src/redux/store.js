import { configureStore } from "@reduxjs/toolkit";

// reducers
import  guidePopup  from "./reducers/guidePopup.js";
import userBalance from "./reducers/userBalance.js";

export default configureStore({
  reducer: {
    guide: guidePopup,
    userBalance: userBalance,
  },
});