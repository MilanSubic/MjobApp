/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

export const konverzacijeSlice = createSlice({
  name: "konverzacije",
  initialState: {
    value: [],
    konverzacija: null,
    tema: null,
    currentPage: 1,
  },
  reducers: {
    setKonverzacije: (state, action) => {
      state.value = action.payload;
    },
    setKonverzacija: (state, action) => {
      state.konverzacija = action.payload;
    },
    setTema: (state, action) => {
      state.tema = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    pushKonverzacija: (state, action) => {
      if (
        state.konverzacija?.id != action.payload.id &&
        !state.tema &&
        state.currentPage === 1
      ) {
        const currentValue = state.value.filter(
          (x) => x.id != action.payload.id
        );
        state.value = [action.payload, ...currentValue];
      }
    },
    readKonverzacija: (state, action) => {
      state.value = [
        ...state.value.map((x) => {
          if (x.id == action.payload) x.procitana = true;
          return x;
        }),
      ];
    },
  },
});

export const {
  setKonverzacije,
  setKonverzacija,
  setTema,
  setCurrentPage,
  pushKonverzacija,
  readKonverzacija,
} = konverzacijeSlice.actions;

export const setKonverzacijeAsync = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch(setKonverzacije(data));
  });
};

export const selectKonverzacije = (state) => state.konverzacije.value;

export default konverzacijeSlice.reducer;
