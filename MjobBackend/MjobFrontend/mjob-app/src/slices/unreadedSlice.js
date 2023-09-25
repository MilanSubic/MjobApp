import { createSlice } from "@reduxjs/toolkit";

export const unreadedSlice = createSlice({
  name: "unreaded",
  initialState: {
    value: null,
  },
  reducers: {
    setUnreaded: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUnreaded } = unreadedSlice.actions;

export default unreadedSlice.reducer;
