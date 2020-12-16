import { useState } from "react";
import { useSelector } from "react-redux";

import ToggleButtons from "./components/ToggleButtons";
import CurrentTime from "./components/CurrentTime";
import SunInfo from "./components/SunInfo";
import Inputs from "./components/Inputs";

import "./App.css";

function App() {
  const theme = useSelector((state) => state.theme);
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className={theme.dark ? "App dark" : "App"}>
      <ToggleButtons />
      <div className="main">
        <CurrentTime />
        <SunInfo selectedDate={selectedDate} />
        <Inputs
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default App;
