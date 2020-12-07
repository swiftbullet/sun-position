import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import changeDate from "./actions/changeDate";
import setLatitude from "./actions/setLatitude";
import setLongitude from "./actions/setLongitude";

import "./Inputs.css";

export default function Inputs() {
  const selectedDate = useSelector((state) => state.selectedDate);
  const langData = useSelector((state) => state.langData);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

  function valuetext(value) {
    return `${value}`;
  }

  const classes = useStyles();
  return (
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
  );
}
