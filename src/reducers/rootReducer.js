import initialState from "./../initialState";
import {
  CHANGE_DATE,
  SWITCH_LANG,
  SWITCH_THEME,
  SET_LAT,
  SET_LONG,
} from "./../constants";

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return { ...state, selectedDate: action.payload };
    case SWITCH_LANG:
      return { ...state, langData: action.payload };
    case SWITCH_THEME:
      return { ...state, theme: action.payload };
    case SET_LAT:
      return { ...state, latitude: action.payload };
    case SET_LONG:
      return { ...state, longitude: action.payload };
    default:
      return state;
  }
}
