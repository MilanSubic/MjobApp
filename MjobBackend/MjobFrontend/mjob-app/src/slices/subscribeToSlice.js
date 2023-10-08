import { createSlice } from "@reduxjs/toolkit";

export const subscribeToSlice = createSlice({
  name: "subscribeTo",
  initialState: {
    value: null,
  },
  reducers: {
    setSubscribeTo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSubscribeTo } = subscribeToSlice.actions;

export default subscribeToSlice.reducer;
