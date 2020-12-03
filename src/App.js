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
import { Provider } from "react-redux";
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

function DiscreteSlider() {
  // const [date, setDate] = useState(new Date());
  const currentDate = new Date()
  const dateO = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate(),
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
    seconds: currentDate.getSeconds()
  }
  const [date, setDate] = useState(dateO);
  useInterval(() => {
    setDate(...date, date.setSeconds(date.getSeconds() + 1));
  }, 1000);
  const sliderRef = useRef(null)
  
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Year
      </Typography>
      {/* <span>date.</span> */}
      <Slider
        // defaultValue={2020}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        ref={sliderRef}
        name="year"
        value={date.year}
        onChange={(e, value) => setDate({...date, year: value})}
        step={1}
        marks={false}
        min={1990}
        max={2030}
      />
      <Typography id="discrete-slider" gutterBottom>
        Month
      </Typography>
      <Slider
        // defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="month"
        value={date.month}
        onChange={(e, value) => setDate({...date, month: value})}
        step={1}
        marks={false}
        min={1}
        max={12}
      />
      <Typography id="discrete-slider" gutterBottom>
        Day
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="day"
        value={date.date}
        onChange={(e, value) => setDate({...date, date: value})}
        step={1}
        marks={false}
        min={1}
        max={30}
      />
      <Typography id="discrete-slider" gutterBottom>
        Hour
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="hour"
        value={date.hours}
        onChange={(e, value) => setDate({...date, hours: value})}
        step={1}
        marks={false}
        min={0}
        max={24}
      />
      <Typography id="discrete-slider" gutterBottom>
        Minute
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="minute"
        value={date.minutes}
        onChange={(e, value) => setDate({...date, minutes: value})}
        step={1}
        marks={false}
        min={0}
        max={60}
      />
      <Typography id="discrete-slider" gutterBottom>
        Second
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="second"
        value={date.seconds}
        onChange={(e, value) => setDate({...date, seconds: value})}
        step={1}
        marks={false}
        min={0}
        max={60}
      />
    </div>
  );
}

//51.84, 107.6

function App() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { azimuth, altitude } = getPosition(new Date(), 51.84, 107.6);
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

  return (
    <Provider store={store}>
      <div className="App">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
          <TimePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>

        <div className="date">
          {new Date().toLocaleTimeString("en-US").split("/:" | "/")}
        </div>
        <div className="azimuth">Azimuth: {azimuth_deg.toFixed(2)}<sup>o</sup></div>

        <div className="altitude">Altitude: {altitude_deg.toFixed(2)}<sup>o</sup></div>
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

        <DiscreteSlider />
      </div>
    </Provider>
  );
}

export default App;
