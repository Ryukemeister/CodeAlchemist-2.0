import { create } from "zustand";

// creating a store function that takes in a set argument
// this set argument is essentially a setter function that returns an object
// that returned object will contain all the values that we've defined in our store
const store = (set) => ({
  codeToBeConverted: "",
  codeToBeExplained: "",
  convertedCode: "",
  codeReadyToBeExplained: [],

  // onchange handlers for the above code values
  setCodeToBeConverted: (newValue) => {
    set(() => ({
      codeToBeConverted: newValue,
    }));
  },
  setCodeToBeExplained: (newValue) =>
    set(() => ({
      codeToBeExplained: newValue,
    })),
  setConvertedCode: (newValue) =>
    set(() => ({
      convertedCode: newValue,
    })),
  setCodeReadyToBeExplained: (newValue) =>
    set(() => ({
      codeReadyToBeExplained: newValue,
    })),
});

export const useStore = create(store);
