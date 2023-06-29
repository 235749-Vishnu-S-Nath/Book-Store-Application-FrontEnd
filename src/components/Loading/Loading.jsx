import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute backdrop-blur-md bg-white/10 z-10">
      <span className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-white"></span>
      </span>
    </div>
  );
};

export default Loading;
