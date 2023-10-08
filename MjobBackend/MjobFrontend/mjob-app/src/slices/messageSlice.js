import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [],
    firstMessage: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
      state.firstMessage = action.payload[action.payload.length - 1];
    },
    addMessage: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
    addMessages: (state, action) => {
      state.value = [...state.value, ...action.payload];
      state.firstMessage = action.payload[action.payload.length - 1];
    },
  },
});

export const { setMessages, addMessage, addMessages } = messagesSlice.actions;

export const setMessagesAsync = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch(setMessages(data));
  });
};

export const selectMessages = (state) => state.messages.value;

export default messagesSlice.reducer;
