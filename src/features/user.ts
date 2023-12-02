import { createAction, createReducer } from "@reduxjs/toolkit";

const isUserLoggedIn = createAction<boolean>(
  "Checks if user is logged in and gets all info"
);

const actions = { isUserLoggedIn };

const initialState = {
  isLoggedIn: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(isUserLoggedIn, (state, action) => ({
    isLoggedIn: action.payload,
  }));
});

export { reducer, actions };
