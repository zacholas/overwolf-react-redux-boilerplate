import * as types from './types';

export const mouseClick = () => {
  return (dispatch) => {
    dispatch({
      type: types.INCREMENT,
      payload: 'there isn\'t one, bruh',
    });
  };
};
