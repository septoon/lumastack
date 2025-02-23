"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import { useColors } from "../common/Colors";
import preloaderAnimation from "../assets/loaders/Preloader.json";

const PreLoader = () => {
  const animationRef = useRef(null);
  const Colors = useColors();

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <div
      className="flex w-full h-full justify-center items-center"
      style={{ backgroundColor: Colors.darkModeBg }}
    >
      <Lottie
        lottieRef={animationRef}
        animationData={preloaderAnimation}
        loop
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default PreLoader;