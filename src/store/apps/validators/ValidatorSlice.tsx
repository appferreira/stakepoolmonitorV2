import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ValidatorState = any

const initialState = {
  validators: [],
  delegators: []
} as ValidatorState;

export const validator = createSlice({
  name: "validator",
  initialState,
  reducers: {
    setValidatorStore: (state, action) => {
      state.validators = action.payload;
    },
    setDelegatorsStore: (state, action) => {
        state.delegators = action.payload;
    }  
  },
});

export const {
    setValidatorStore,
    setDelegatorsStore
} = validator.actions;
export default validator.reducer;
