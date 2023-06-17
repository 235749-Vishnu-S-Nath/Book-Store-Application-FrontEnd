import React from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../../../components/NavBar/NavBar';

const AdminHomePage = () => {
  const navigate = useNavigate();
  const click =()=>{
      navigate('/adminAdd')
  }
  return (
    <div className='h-screen w-screen'>
      <NavBar />
      <div className='h-4/5 flex justify-center items-center'>
        <div className='grid backdrop-blur-md rounded-md bg-white/30 w-3/4 grid-cols-2 gap-6 p-10'>

          <div className='bg-white/30 rounded-md pl-10 flex flex-row items-center p-5 hover:bg-white hover:cursor-pointer' onClick={click}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-28 h-28 p-6 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className='font-extrabold text-slate-500 text-3xl'>Add Books</h1>
          </div>
          <div className='bg-white/30 rounded-md pl-10 flex flex-row items-center p-5 hover:bg-white hover:cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-28 h-28 p-6 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className='font-extrabold text-slate-500 text-3xl'>View Books</h1>
          </div>
          <div className='bg-white/30 rounded-md pl-10 flex flex-row items-center p-5 hover:bg-white hover:cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-28 h-28 p-6 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <h1 className='font-extrabold text-slate-500 text-3xl'>Update Books</h1>
          </div>
          <div className='bg-white/30 rounded-md pl-10 flex flex-row items-center p-5 hover:bg-white hover:cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-28 h-28 p-6 text-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <h1 className='font-extrabold text-slate-500 text-3xl'>Delete Books</h1>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminHomePage