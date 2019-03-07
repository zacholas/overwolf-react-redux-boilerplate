import * as types from "../actions/types";

const INITIAL_STATE = {
  zachtestnumber: 1
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return { ...state,
        zachtestnumber: state.zachtestnumber + 1
      };
    default:
      return state;
  }
};