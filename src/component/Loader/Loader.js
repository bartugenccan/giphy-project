import React from "react";
import Lottie from "react-lottie";
import animationData from "./66428-gif-animation.json";

//CSS
import "./Loader.css";

const Loader = () => {
  return (
    <div>
      <Lottie
        options={{
          animationData,
        }}
        width={500}
        height={500}
      />
    </div>
  );
};

export default Loader;
