import { CHANGE_DATE } from "./../constants";

export default function changeDate(value) {
  return { type: CHANGE_DATE, payload: value };
}
