// store/validatorStore.js
let validators: any = [];

export const setValidatorsStore = (newValidators: any) => {
  validators = newValidators;
};

export const getValidators = () => validators;
