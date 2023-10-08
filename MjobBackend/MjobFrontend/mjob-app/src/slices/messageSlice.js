import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
    addMessage: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export const setMessagesAsync = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch(setMessages(data));
  });
};

export const selectMessages = (state) => state.messages.value;

export default messagesSlice.reducer;
