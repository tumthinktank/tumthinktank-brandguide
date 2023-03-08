import React, { useEffect, useState } from "react";

const SignetAnimation = () => {
  const pathData = [
    "M 10 0 L 0 0 L 0 2 L 4 2 L 4 12 L 6 12 L 6 3 M 1 1 L 10 1 L 10 2 L 5 2 L 5 11",
    "M 0 0 L 10 0 L 10 2 L 6 2 L 6 12 L 5 12 L 5 2 M 9 1 L 0 1 L 0 2 L 4 2 L 4 12",
    "M 10 0 L 0 0 L 0 2 L 4 2 L 4 12 L 6 12 L 6 3 M 1 1 L 10 1 L 10 2 L 5 2 L 5 11",
    "M 10 0 L 0 0 L 0 2 L 4 2 L 4 12 L 6 12 L 6 2 L 10 2 L 10 1 L 1 1 M 5 2 L 5 11",
    "M 10 0 L 0 0 L 0 1 L 10 1 L 10 2 L 6 2 L 6 12 L 5 12 L 5 2 M 0 2 L 4 2 L 4 12",
    "M 10 0 L 0 0 L 0 1 L 10 1 L 10 2 L 6 2 L 6 12 L 4 12 L 4 3 M 0 2 L 5 2 L 5 11",
    "M 0 0 L 10 0 L 10 1 L 0 1 L 0 2 L 4 2 L 4 12 L 6 12 L 6 3 M 10 2 L 5 2 L 5 11",
    "M 0 0 L 10 0 L 10 1 L 0 1 L 0 2 L 4 2 L 4 12 M 5 2 L 5 12 L 6 12 L 6 2 L 10 2",
    "M 10 0 L 0 0 L 0 2 L 4 2 L 4 12 L 5 12 L 5 2 M 6 12 L 6 2 L 10 2 L 10 1 L 1 1",
    "M 10 0 L 0 0 L 0 1 L 10 1 L 10 2 L 5 2 L 5 11 M 6 3 L 6 12 L 4 12 L 4 2 L 0 2",
    "M 10 0 L 0 0 L 0 2 L 4 2 L 4 12 M 1 1 L 10 1 L 10 2 L 5 2 L 5 12 L 6 12 L 6 3",
  ];

  const [path, setPath] = useState("");
  const [transformValues, setTransformValues] = useState({
    skewX: { angle: 0 },
    scale: { x: 1, y: 1 },
    translate: { x: 0, y: -0.375 },
  });

  // DETANGLES a css or svg tranformation string
  // (use either , or space consistently)
  // ===========================================

  function detangleTransform(transform) {
    // Initialize an empty object to store the individual transform values
    let transformations = transform.match(/\w+\([^\)]+\)/g);
    let transformValues = {};

    // Iterate through the array of transformations
    for (let i = 0; i < transformations.length; i++) {
      // Split each transformation into the type and value
      let [type, ...values] = transformations[i].split(/[\(|,|\s+\)]/);
      values = values.filter((val) => val !== "");
      // Split values depending on the transformation type
      switch (type) {
        case "translate":
          transformValues.translate = {
            x: values[0],
            y: values[1],
            z: values[2],
          };
          break;
        case "scale":
          transformValues.scale = { x: values[0], y: values[1], z: values[2] };
          break;
        case "rotate":
          transformValues.rotate = {
            x: values[0],
            y: values[1],
            z: values[2],
            angle: values[3],
          };
          break;
        case "skewX":
          transformValues.skewX = { angle: values[0] };
          break;
        case "skewY":
          transformValues.skewY = { angle: values[0] };
          break;
        case "matrix":
          transformValues.matrix = {
            a: values[0],
            b: values[1],
            c: values[2],
            d: values[3],
            e: values[4],
            f: values[5],
          };
          break;
        default:
          console.log(`Unsupported transformation type: ${type}`);
      }
    }
    return transformValues;
  }

  // GENERATES a css or svg tranformation string
  // (define seperator, defaults to space)
  // ===========================================

  function generateTransform(transformValues, separator = " ") {
    let transform = "";
    for (let key in transformValues) {
      switch (key) {
        case "translate":
          let x = transformValues[key].x;
          let y = transformValues[key].y;
          let z = transformValues[key].z;
          if (z) transform += `${key}(${x}${separator}${y}${separator}${z}) `;
          else transform += `${key}(${x}${separator}${y}) `;
          break;
        case "scale":
          let sx = transformValues[key].x;
          let sy = transformValues[key].y;
          let sz = transformValues[key].z;
          if (sz)
            transform += `${key}(${sx}${separator}${sy}${separator}${sz}) `;
          else transform += `${key}(${sx}${separator}${sy}) `;
          break;
        case "rotate":
          let rx = transformValues[key].x;
          let ry = transformValues[key].y;
          let rz = transformValues[key].z;
          let angle = transformValues[key].angle;
          if (rx || ry || rz)
            transform += `${key}(${rx}${separator}${ry}${separator}${rz}${separator}${angle}) `;
          else transform += `${key}(${angle}) `;
          break;
        case "skewX":
          let angleX = transformValues[key].angle;
          transform += `${key}(${angleX}) `;
          break;
        case "skewY":
          let angleY = transformValues[key].angle;
          transform += `${key}(${angleY}) `;
          break;
        case "matrix":
          let a = transformValues[key].a;
          let b = transformValues[key].b;
          let c = transformValues[key].c;
          let d = transformValues[key].d;
          let e = transformValues[key].e;
          let f = transformValues[key].f;
          transform += `${key}(${a}${separator}${b}${separator}${c}${separator}${d}${separator}${e}${separator}${f}) `;
          break;
        default:
          console.log(`Unsupported transformation type: ${type}`);
      }
    }
    return transform.slice(0, -1);
  }


  useEffect(() => {
    // Randomise logo path
    const randomIndex = Math.floor(Math.random() * pathData.length);
    setPath(pathData[randomIndex]);
  }, []);

  useEffect(() => {
    // Add event listener to follow mouse movement
    function handleMouseMove(event) {
      // Calculate distort values dependent on mouse position
      const maxDistortValueX = 60;
      const maxDistortValueY = 0.2;
      const distortBaseY = 0.4;

      const distortValueX =
        (event.clientX / window.innerWidth) * maxDistortValueX * 2 -
        maxDistortValueX;
      const distortValueY =
        distortBaseY -
        maxDistortValueY / 2 +
        (event.clientY / window.innerHeight) * maxDistortValueY;

      // Update transform values
      setTransformValues({
        skewX: { angle: distortValueX },
        scale: { x: 1, y: distortValueY },
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  })

  return (
    <div
      className="logo-container"
      style={{
        maxWidth: "800px",
        width: "100%",
        position: "relative",
        margin: "50px auto",
        display: "flex",
      }}
    >
      <svg
        viewBox="-11 -0.5 33 12.8"
        className="logo"
        style={{
          height: "230px",
          margin: "0 auto",
        }}
      >
        <path
          id="TTT-shadow"
          d={path}
          stroke="#eee"
          strokeWidth="0.5"
          strokeLinecap="square"
          fill="none"
          transform={generateTransform(transformValues)}
          transform-origin="center bottom"
        />

        <path
          d={path}
          stroke="#000000"
          strokeWidth="0.5"
          strokeLinecap="square"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default SignetAnimation;
