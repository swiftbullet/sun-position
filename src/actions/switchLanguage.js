import { SWITCH_LANG } from "./../constants";

export default function switchLanguage(value) {
  return { type: SWITCH_LANG, payload: value };
}
