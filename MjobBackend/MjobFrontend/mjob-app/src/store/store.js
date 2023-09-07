import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../slices/messageSlice";

export default configureStore({
  reducer: {
    messages: messagesReducer,
  },
});
