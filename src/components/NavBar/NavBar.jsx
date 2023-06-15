import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-screen flex py-2 backdrop-blur-lg justify-between rounded-md'>
        <div className="logo w-8/12 flex items-center">
            <div className="p-2 px-4 pl-10">
                <h1 className='text-slate-700 text-6xl font-extrabold LOGO'>ReadEasy</h1>
            </div>
        </div>
        <div className="nav flex justify-end px-16 items-center w-4/12">
            <div className="backdrop-blur-sm text-slate-700 hover:cursor-pointer font-bold bg-white/30 rounded-md p-2 w-6/12 hover:bg-slate-700 hover:text-white" 
                onClick={()=>navigate('/login')}>
                <h3 className='text-center hover:cursor-pointer'>Log-out</h3>
            </div>
        </div>
    </div>
  )
}

export default NavBar