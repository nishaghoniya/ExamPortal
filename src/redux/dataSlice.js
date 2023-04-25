import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exam: "",
  answer: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { getData, setAnswer } = dataSlice.actions;

export default dataSlice.reducer;
