import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../slices/messageSlice";
import unreadedReducer from "../slices/unreadedSlice";
import subscribeToReducer from "../slices/subscribeToSlice";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    unreaded: unreadedReducer,
    subscribeTo: subscribeToReducer,
  },
});
