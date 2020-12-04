import { SWITCH_THEME } from "./../constants";

export default function switchTheme(value) {
  return { type: SWITCH_THEME, payload: value };
}
