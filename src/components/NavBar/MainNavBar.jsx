import React from 'react'
import { useNavigate } from "react-router-dom";

const MainNavBar = ({login,register,home}) => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex py-2 backdrop-blur-lg rounded-md'>
        <div className="logo w-8/12 flex items-center cursor-default">
            <div className="p-2 px-4 pl-10">
                <h1 className='text-slate-700 text-6xl font-extrabold LOGO'>ReadEasy</h1>
            </div>
        </div>
        <div className="nav flex items-center gap-3 p-4 w-4/12">
            {
                login&&
                <div className="backdrop-blur-sm text-slate-700 hover:cursor-pointer font-bold bg-white/30 rounded-md p-2 w-6/12 hover:bg-slate-700 hover:text-white" 
                    onClick={()=>navigate('/login')}>
                    <h3 className='text-center hover:cursor-pointer'>Login</h3>
                </div>
            }
            {
                register&&
                <div className="backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md p-2 w-6/12 hover:bg-slate-700 hover:text-white"
                    onClick={()=>navigate('/register')}>
                    <h3 className='text-center hover:cursor-pointer'>Register</h3>
                </div>
            }
            {
                home&&
                <div className="backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md p-2 w-6/12 hover:bg-slate-700 hover:text-white"
                    onClick={()=>navigate('/')}>
                    <h3 className='text-center hover:cursor-pointer'>Home</h3>
                </div>
            }
        </div>
    </div>
  )
}

export default  MainNavBar