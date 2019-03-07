import { combineReducers } from 'redux';
import PubgInfoReducer from './PubgInfoReducer';

export default combineReducers({
  pubg_info: PubgInfoReducer,
});