import { useState } from "react";
import { useSelector } from "react-redux";
import useInterval from "@use-it/interval";

import "./CurrentTime.css";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const langData = useSelector((state) => state.langData);

  useInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return (
    <div className="current-time">
      {langData.currentTime}: {currentTime.toLocaleTimeString("ru-RU")}
    </div>
  );
}
