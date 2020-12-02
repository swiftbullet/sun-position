import React, { useRef } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current

//   const add = function (x) {
//       return function (y) {
//           return x + y
//       }
//   }
  const add = (...args) => args.reduce((a, b) => a + b, 0)
  const addC = (a, b) => (c) => a + b + c

  add(4, 5, 3, 7)
  addC(3)

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
