import { useState } from "react";
import { useSelector } from "react-redux";
import useInterval from "@use-it/interval";

import getPosition from "./../../utils/sunPosition";

import "./SunInfo.css";

const daylightColor = "#228be6";
const goldenHoursColor = "#f08c00";
const twilightColor = "#9775fa";
const nightColor = "#5e81ac";

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

const radiansToDegrees = (rad) => {
  const degree = rad * (180 / Math.PI);
  return degree;
};

export default function SunInfo() {
  const langData = useSelector((state) => state.langData);
  const selectedDate = useSelector((state) => state.selectedDate);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);

  const [sunPosition, setSunPosition] = useState(
    getPosition(selectedDate, latitude, longitude)
  );

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

  return (
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
  );
}
