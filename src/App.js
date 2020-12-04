import "./App.css";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import CurrentTime from "./components/CurrentTime";
import Inputs from "./components/Inputs";
import SunInfo from "./components/SunInfo";
import ToggleButtons from "./components/ToggleButtons";

import changeDate from "./actions/changeDate";
import setLatitude from "./actions/setLatitude";
import setLongitude from "./actions/setLongitude";
import switchLanguage from "./actions/switchLanguage";
import switchTheme from "./actions/switchTheme";

import { useDispatch, useSelector } from "react-redux";
import useInterval from "@use-it/interval";

import getPosition from "./utils/sunPosition";

const language = {
  EN: {
    currentTime: "Current time",
    selectedTime: "Selected time",
    darkTheme: "Dark Theme",
    lightTheme: "Light Theme",
    azimuth: "Azimuth",
    altitude: "Altitude",
    latitude: "Latitude",
    longitude: "Longitude",
  },
  RU: {
    currentTime: "Текущее время",
    selectedTime: "Выбранное время",
    darkTheme: "Темная тема",
    lightTheme: "Светлая тема",
    azimuth: "Азимут",
    altitude: "Высота",
    latitude: "Широта",
    longitude: "Долгота",
  },
};

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

function App() {
  // const [selectedDate, handleDateChange] = useState(new Date());
  const selectedDate = useSelector((state) => state.selectedDate);
  const dispatch = useDispatch();

  const langData = useSelector((state) => state.langData);

  const theme = useSelector((state) => state.theme);

  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);

  const [sunPosition, setSunPosition] = useState(
    getPosition(selectedDate, latitude, longitude)
  );

  const radiansToDegrees = (rad) => {
    const degree = rad * (180 / Math.PI);
    return degree;
  };

  const azimuthDeg = radiansToDegrees(sunPosition.azimuth) + 180;
  const altitudeDeg = radiansToDegrees(sunPosition.altitude);

  useInterval(() => {
    setSunPosition(
      getPosition(
        selectedDate.setSeconds(selectedDate.getSeconds() + 1),
        latitude,
        longitude
      )
    );
  }, 1000);

  const nightColor = "#5e81ac";
  const goldenHoursColor = "#f08c00";
  const twilightColor = "#9775fa";
  const daylightColor = "#228be6";

  const color = (sunAltitude) => {
    if (sunAltitude >= 10) {
      return daylightColor;
    } else if (sunAltitude < 10 && sunAltitude >= 0) {
      return goldenHoursColor;
    } else if (sunAltitude < 0 && sunAltitude >= -10) {
      return twilightColor;
    } else if (sunAltitude < -10) {
      return nightColor;
    }
  };

  const classes = useStyles();

  function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return (
      <div className="current-time">
        {langData.currentTime}: {currentTime.toLocaleTimeString("ru-RU")}
      </div>
    );
  }

  return (
    <div className={theme.dark ? "App dark" : "App"}>
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

      <div className="main">
        <Clock />


        <div className="sun-info">
          <div className="sun-info__block">
            <div
              className="sun-info__gauge"
              style={{ transform: `rotateZ(${azimuthDeg + 180}deg)` }}
            >
              <div
                className="sun-info__marker"
                style={{ border: `${color(altitudeDeg)} solid .5vw` }}
              ></div>
            </div>
            <div className="sun-info__data">
              {langData.azimuth}: {azimuthDeg.toFixed(2)}
              <sup>o</sup>
            </div>
          </div>
          <div className="sun-info__block">
            <div
              className="sun-info__gauge"
              style={{ transform: `rotateZ(${-altitudeDeg - 90}deg)` }}
            >
              <div
                className="sun-info__marker"
                style={{ border: `${color(altitudeDeg)} solid 0.5vw` }}
              ></div>
            </div>
            <div className="sun-info__data">
              {langData.altitude}: {altitudeDeg.toFixed(2)}
              <sup>o</sup>
            </div>
          </div>
        </div>

        <div className="inputs">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={selectedDate}
              onChange={(e, value) => dispatch(changeDate(value))}
            />
            <TimePicker
              value={selectedDate}
              onChange={(e, value) => dispatch(changeDate(value))}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom>
              {langData.latitude}
            </Typography>

            <Slider
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              value={latitude}
              onChange={(e, value) => dispatch(setLatitude(value))}
              marks={false}
              min={-90}
              max={90}
            />
            <Typography id="discrete-slider" gutterBottom>
              {langData.longitude}
            </Typography>
            <Slider
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              value={longitude}
              onChange={(e, value) => dispatch(setLongitude(value))}
              marks={false}
              min={-180}
              max={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
