import {createSlice} from '@reduxjs/toolkit';

const initialState = {numOfIcecreams: 20};

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: state => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  extraReducers: {
    ['cake/ordered']: state => {
      state.numOfIcecreams--;
    },
  },
});

export const icecreamActions = icecreamSlice.actions;

export default icecreamSlice.reducer;
