import { createSlice } from "@reduxjs/toolkit";

const initialState = { carCollection: [] };

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    addNewCar: (state, action) => {
      console.log("========");
      console.log(action);
      console.log("========");

      state.carCollection.push(action.payload);
    },
    deleteCar: (state, action) => {
      console.log("========");
      console.log(action);
      console.log("========");

      // const updateArray = state.carCollection.filter((thisElement) => {
      //   return (
      //     thisElement.brand === action.payload.brand &&
      //     thisElement.name === action.payload.name &&
      //     thisElement.model === action.payload.model &&
      //     thisElement.color === action.payload.color
      //   );
      //   state.carCollection = updateArray;
      // });

      const index = state.carCollection.findIndex(
        (car) => car.id === action.payload.id
      );
      state.carCollection.splice(index, 1);

      // state.carCollection.filter((item, index) => {!== action.payload})
    },
    // findCarByBrand: (state, action) => {
    //   console.log("========");
    //   console.log(action.payload);
    //   console.log("========");

    //   return action.payload;
    //   // return state.carCollection.filter((action.payload) => action.payload.carBrand.toLowerCase().includes(action.payload.toLowerCase()));
    // },
  },
});

export const carActions = carSlice.actions;

export default carSlice.reducer;
