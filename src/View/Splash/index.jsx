import React, { useEffect } from "react";
import "../../../src/Style/Splash.css";
import FadeLoader from "react-spinners/FadeLoader";
import PulseLoader from "react-spinners/PulseLoader";

const SplashScreen = () => {
  useEffect(() => {
    document.title = `Loading...`;
  });

  return (
    <div className="splash-screen">
      <div className="splash-card">
        <h1 className="">
          <div className="splash-content">
            <FadeLoader size={150} color="white" />
          </div>
          <span className="text-2xl">Please wait</span>{" "}
          <span>
            <PulseLoader size={10} color="white"/>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
