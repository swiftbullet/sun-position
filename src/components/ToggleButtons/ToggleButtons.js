import { useDispatch, useSelector } from "react-redux";

import switchLanguage from "./../../actions/switchLanguage";
import switchTheme from "./../../actions/switchTheme";

import language from "./../../intl/language";

import "./ToggleButton.css";

export default function ToggleButton() {
  const langData = useSelector((state) => state.langData);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className="toggle-buttons">
      <button
        className="toggle-theme"
        onClick={() =>
          theme.dark
            ? dispatch(switchTheme({ dark: false }))
            : dispatch(switchTheme({ dark: true }))
        }
      >
        {theme.dark ? langData.lightTheme : langData.darkTheme}
      </button>
      <button
        className="toggle-lang"
        onClick={() =>
          langData === language.RU
            ? dispatch(switchLanguage(language.EN))
            : dispatch(switchLanguage(language.RU))
        }
      >
        {langData === language.RU ? "EN" : "RU"}
      </button>
    </div>
  );
}
