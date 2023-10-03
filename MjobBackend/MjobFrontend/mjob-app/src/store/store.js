import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../slices/messageSlice";
import konverzacijeReducer from "../slices/konverzacijeSlice";
import unreadedReducer from "../slices/unreadedSlice";
import subscribeToReducer from "../slices/subscribeToSlice";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    konverzacije: konverzacijeReducer,
    unreaded: unreadedReducer,
    subscribeTo: subscribeToReducer,
  },
});
