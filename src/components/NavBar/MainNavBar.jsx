import React from 'react'
import { useNavigate } from "react-router-dom";

const MainNavBar = ({login,register,home}) => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex py-2 backdrop-blur-lg mb-10'>
        <div className="logo w-8/12 flex items-center cursor-default">
            <div className="p-2 px-4 pl-10">
                <h1 className='md:text-6xl text-3xl font-extrabold LOGO'>ReadEasy</h1>
            </div>
        </div>
        <div className="nav-md flex items-center gap-3 p-4 w-4/12">
            {
                login&&
                <div className="backdrop-blur-sm text-white hover:cursor-pointer font-bold bg-white/10 rounded-md p-2 w-6/12 ease-in-out duration-300 hover:bg-white hover:text-blue-900" 
                    onClick={()=>navigate('/login')}>
                    <h3 className='text-center md:text-base sm:text-sm hover:cursor-pointer'>Login</h3>
                </div>
            }
            {
                register&&
                <div className="backdrop-blur-sm text-white hover:cursor-pointer font-bold bg-white/10 rounded-md p-2 w-6/12 ease-in-out duration-300 hover:bg-white hover:text-blue-900"
                    onClick={()=>navigate('/register')}>
                    <h3 className='text-center hover:cursor-pointer'>Register</h3>
                </div>
            }
            {
                home&&
                <div className="backdrop-blur-sm text-white hover:cursor-pointer font-bold bg-white/10 rounded-md p-2 w-6/12 ease-in-out duration-300 hover:bg-white hover:text-blue-900"
                    onClick={()=>navigate('/')}>
                    <h3 className='text-center hover:cursor-pointer'>Home</h3>
                </div>
            }
        </div>
    </div>
  )
}

export default  MainNavBar