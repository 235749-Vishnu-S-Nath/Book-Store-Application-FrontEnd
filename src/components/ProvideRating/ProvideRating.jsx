import React from "react";

const ProvideRating = ({ setIsRatingOpen }) => {
  return (
    <div className="absolute z-10 top-0 left-0 w-screen h-screen backdrop-blur-md bg-white/30 flex justify-center items-center">
      <div className="w-3/4 h-2/3 flex justify-center items-center border-2 border-slate-700 rounded-lg p-10 bg-white/50">
        <div className="w-full">
          
        </div>
        <div className="w-full text-right">
          <button
            onClick={() => setIsRatingOpen(false)}
            className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProvideRating;
