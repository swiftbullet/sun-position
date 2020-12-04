import { SET_LAT } from "./../constants";

export default function setLatitude(value) {
  return { type: SET_LAT, payload: value };
}
