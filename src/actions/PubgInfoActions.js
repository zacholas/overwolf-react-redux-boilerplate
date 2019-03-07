import * as types from './types';

export const mouseClickAction = {
  type: types.INCREMENT,
  payload: 'there isn\'t one, bruh',
};

export const mouseClick = () => {
  return (dispatch) => {
    dispatch(mouseClickAction);
  };
};
