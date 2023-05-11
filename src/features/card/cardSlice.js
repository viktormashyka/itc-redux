import { createSlice } from "@reduxjs/toolkit";

const initialState = { cardCollection: [] };

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addNewCard: (state, action) => {
      console.log("========");
      console.log(action);
      console.log("========");

      state.cardCollection.push(action.payload);
    },
    deleteCard: (state, action) => {
      console.log("========");
      console.log(action);
      console.log("========");

      const index = state.cardCollection.findIndex(
        (car) => car.id === action.payload.id
      );
      state.cardCollection.splice(index, 1);

      // another variant =>
      // state.cardCollection = state.cardCollection.filter((thisEl) => {
      //   return !(
      //     thisEl.name === action.payload.name &&
      //     thisEl.details === action.payload.details &&
      //     thisEl.price === action.payload.price
      //   );
      // });
      // console.log("state.cardCollection: ", state.cardCollection);
    },
  },
});

export const cardActions = cardSlice.actions;

export default cardSlice.reducer;
