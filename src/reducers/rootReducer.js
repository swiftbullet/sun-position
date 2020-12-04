import { combineReducers } from "redux";

const rootReducer = () => (state, action) => {
  switch (action.type) {
    case action.type === "":
      return 0;
    default:
      return state;
  }
};

export default rootReducer();
