import { SET_LONG } from "./../constants";

export default function setLongitude(value) {
  return { type: SET_LONG, payload: value };
}
