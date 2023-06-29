import React, { useState } from 'react';

const PopUp = ({ message ,setIsOpen}) => {

  const closePopUp = () => {
    setIsOpen(false)
  };

  return (
    <div className='absolute z-10 backdrop-blur-sm bg-white/10 w-screen h-screen flex justify-center items-center'>
        <div className='w-1/4 h-1/4 hover:scale-110 ease-in-out duration-300 bg-white border-2 border-blue-900 rounded-md flex justify-center items-center flex-col'>
          <h1 className='text-xl font-black mb-10 text-blue-900'>{message}</h1>
          <button className='mx-3 text-blue-900 font-bold hover:bg-blue-800 hover:text-white px-5 py-1 border-blue-900 ease-in-out duration-200 hover:scale-110 border-2 rounded-md mb-2' onClick={closePopUp}>Ok</button>
        </div>
    </div>
  )
}

export default PopUp