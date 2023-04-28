import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exam: "",
  answer: [],
  time: "",
  user: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.exam = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearData: (state, action) => {
      state.answer = [];
      state.time = "";
      state.user = {};
      state.exam = "";
    },
  },
});

export const { getData, setAnswer, setTime, setUser, clearData } =
  dataSlice.actions;

export default dataSlice.reducer;
