import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    value: [],
    firstMessage: null,
    scroll: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
      if (action.payload && action.payload.length > 0) {
        state.firstMessage = action.payload[action.payload.length - 1];
        state.scroll = action.payload[0];
      }
    },
    addMessage: (state, action) => {
      state.value = [action.payload, ...state.value];
      state.scroll = action.payload;
    },
    addMessages: (state, action) => {
      state.value = [...state.value, ...action.payload];
      state.firstMessage = action.payload[action.payload.length - 1];
    },
    setScroll: (state, action) => {
      state.scroll = action.payload;
    },
  },
});

export const { setMessages, addMessage, addMessages, setScroll } =
  messagesSlice.actions;

export const setMessagesAsync = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch(setMessages(data));
  });
};

export const selectMessages = (state) => state.messages.value;

export default messagesSlice.reducer;
