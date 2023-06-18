import React, { useState } from 'react';

const PopUp = ({ message ,setIsOpen}) => {

  const closePopUp = () => {
    setIsOpen(false)

  };

  return (
    <div className='absolute z-10 backdrop-blur-sm bg-white/20 w-screen h-screen flex justify-center items-center'>
        <div className='w-1/4 h-1/4 bg-white border-2 border-slate-800 rounded-md flex justify-center items-center flex-col'>
          <h1 className='text-xl font-extrabold mb-10'>{message}</h1>
          <button className='mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2' onClick={closePopUp}>Ok</button>
        </div>
    </div>
  )
}

export default PopUp