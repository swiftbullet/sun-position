import "./App.css";
import { useState, useRef } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import useInterval from "@use-it/interval";

import getPosition from "./utils/sun_position";
// import { colors } from "material-ui/styles";

//default value
const initialState = {};

//reducers
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case action.type === "":
      return 0;
    default:
      return state;
  }
};

//store
const store = createStore(rootReducer, initialState);

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return <div className="date">{currentTime.toLocaleTimeString("ru-RU")}</div>;
}



function App() {
  const [selectedDate, handleDateChange] = useState(new Date());

  const initial_longitude = 107.6;
  const initial_latitude = 51.84;
  const [coordinates, setCoordinates] = useState({
    latitude: initial_latitude,
    longitude: initial_longitude,
  });
  // const date = new Date();
  const { azimuth, altitude } = getPosition(
    selectedDate,
    coordinates.latitude,
    coordinates.longitude
  );
  // var position = SunCalc.getPosition(new Date(), 51, 107);
  const azimuth_to_degrees = (rad) => {
    const degree = rad * (180 / Math.PI);
    return degree + 180;
  };
  const altitude_to_degrees = (rad) => {
    const degree = rad * (180 / Math.PI);
    return degree;
  };
  const azimuth_deg = azimuth_to_degrees(azimuth);
  const altitude_deg = altitude_to_degrees(altitude);

  const night_color = "#5e81ac";
  const golden_hours_color = "#f08c00";
  const twilight_color = "#9775fa";
  const daylight_color = "#228be6";

  const color = (sun_altitude) => {
    if (sun_altitude >= 10) {
      return daylight_color;
    } else if (sun_altitude < 10 && sun_altitude >= 0) {
      return golden_hours_color;
    } else if (sun_altitude < 0 && sun_altitude >= -10) {
      return twilight_color;
    } else if (sun_altitude < -10) {
      return night_color;
    }
  };

  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className="App">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
          <TimePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>

        <Clock />

        <div className="azimuth">
          Azimuth: {azimuth_deg.toFixed(2)}
          <sup>o</sup>
        </div>

        <div className="altitude">
          Altitude: {altitude_deg.toFixed(2)}
          <sup>o</sup>
        </div>
        {/* <div className="altitude">{position.altitude}</div> */}
        <div
          className="container"
          style={{ transform: `rotateZ(${azimuth_deg}deg)` }}
        >
          <div
            className="marker"
            style={{ border: `${color(altitude_deg)} solid 3px` }}
          ></div>
        </div>
        <div
          className="container"
          style={{ transform: `rotateZ(${-altitude_deg + 90}deg)` }}
        >
          <div
            className="marker"
            style={{ border: `${color(altitude_deg)} solid 3px` }}
          ></div>
        </div>
        <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>
            Latitude
          </Typography>
          {/* <span>date.</span> */}
          <Slider
            // defaultValue={2020}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            value={coordinates.latitude}
            onChange={(e, value) =>
              setCoordinates({ ...coordinates, latitude: value })
            }
            marks={false}
            min={-90}
            max={90}
          />
          <Typography id="discrete-slider" gutterBottom>
            Longitude
          </Typography>
          <Slider
            // defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            value={coordinates.longitude}
            onChange={(e, value) =>
              setCoordinates({ ...coordinates, longitude: value })
            }
            marks={false}
            min={-180}
            max={180}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
