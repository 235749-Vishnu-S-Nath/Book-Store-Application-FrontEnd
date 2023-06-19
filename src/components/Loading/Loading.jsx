import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute backdrop-blur-md bg-white/30 z-10">
      <span class="relative flex h-10 w-10">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-10 w-10 bg-slate-700"></span>
      </span>
    </div>
  );
};

export default Loading;
