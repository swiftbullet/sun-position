import { useSelector } from "react-redux";

import CurrentTime from "./components/CurrentTime";
import Inputs from "./components/Inputs";
import SunInfo from "./components/SunInfo";
import ToggleButtons from "./components/ToggleButtons";

import "./App.css";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className={theme.dark ? "App dark" : "App"}>
      <ToggleButtons />
      <div className="main">
        <CurrentTime />
        <SunInfo />
        <Inputs />
      </div>
    </div>
  );
}

export default App;
