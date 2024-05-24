import React from "react";
import { ScaleLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div className="bg-main flex justify-center items-center h-svh w-full">
      <ScaleLoader
        color="#daff09"
        height={37}
        margin={3}
        radius={2}
        width={10}
      />
    </div>
  );
}

export default LoadingScreen;
