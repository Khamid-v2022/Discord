import { configureStore } from "@reduxjs/toolkit";

// reducers
import  guidePopup  from "./reducers/guidePopup.js";

export default configureStore({
  reducer: {
    guide: guidePopup,
  },
});

