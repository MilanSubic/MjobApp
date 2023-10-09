/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

export const oglasiSlice = createSlice({
  name: "oglasi",
  initialState: {
    value: [],
    reload: null,
  },
  reducers: {
    setOglasi: (state, action) => {
      state.value = [...action.payload];
    },
    replaceOglas: (state, action) => {
      state.value = [
        ...state.value.map((x) => {
          if (x.id == action.payload.id) {
            return { ...action.payload };
          }
          return x;
        }),
      ];
    },
    setReload: (state, action) => {
      state.reload = { ...action.payload };
    },
  },
});

export const { setOglasi, replaceOglas, setReload } = oglasiSlice.actions;

export default oglasiSlice.reducer;
