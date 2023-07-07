import axios from 'axios';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { IsOpenContext } from '../../components/Context/IsOpenContext';
import MainNavBar from '../../components/NavBar/MainNavBar';
import PopUp from "../../components/PopUp/PopUp";

const Register = () => {

    const navigate = useNavigate()

    const {message, isOpen, setMessage, setIsOpen} = React.useContext(IsOpenContext)

    const [checkPass,setCheckPass]=React.useState(false);
    const [formState,setFormState]=React.useState({
        'rUsername':'',
        'rEmail':'',
        'rPassword':'',
        'rCPassword':''
    });

    const onUpdate=(event)=>{
        const {id,value}=event.target
        setFormState(preData=>{
            return{
                ...preData,
                [id]:value
            }
        })
    }

    const checkPassword=(event)=>{
        event.preventDefault()
        if(formState.rUsername===''||formState.rEmail===''||formState.rPassword===''){
            setMessage('Provide valid Information')
            setIsOpen(true)
        }
        else if(formState.rPassword===formState.rCPassword){
            const payload = {
                'username':formState.rUsername,
                'email':formState.rEmail,
                'password':formState.rPassword
            }

            axios.post("http://localhost:9090/api/v1/users/register",payload).then(response=>{
                if(response.status===201){
                    setCheckPass(false)
                    setMessage("Successfully Registered")
                    setIsOpen(true)
                    navigate('/login')
                }
                else{
                    setCheckPass(true)
                }
            }).catch(error=>{
                if(error.response.status===409){
                    setMessage("User already exist")
                    setIsOpen(true)
                }
                else{
                    setMessage("Server Error")
                    setIsOpen(true) 
                }
            })
        }
        else{
            setCheckPass(true)
        }
    }

  return (
    <div className="w-screen h-screen">
        {isOpen && <PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
        <MainNavBar login={true} register={false} home={true}/>
        <div className="w-full h-4/5 flex justify-center items-center flex-col">
        <h1 className='font-extrabold text-right text-5xl p-3 w-3/5'>Register</h1>
            <div className="rounded-md backdrop-blur-md p-5 py-10 bg-white/10 w-3/5 flex items-center justify-center flex-col">
                <div className="mb-4 w-4/5">
                    <input className='w-full p-3 px-5 text-black rounded-md' type="text" id="rUsername" name="username" value={formState.rUsername} onChange={onUpdate} placeholder="Please Provide your Username"/>
                </div>
                <div className="mb-4 w-4/5">
                    <input className='w-full p-3 px-5 text-black rounded-md' type="email" required id="rEmail" name="email" value={formState.rEmail} onChange={onUpdate} placeholder="Please Provide a valid email"/>
                </div>
                <div className="mb-4 w-4/5">
                    <input className='w-full p-3 px-5 text-black rounded-md' type="password" id="rPassword" name="password" value={formState.rPassword} onChange={onUpdate} placeholder="Please provide a Password"/>
                </div>
                <div className="w-4/5">
                    <input className='w-full p-3 px-5 text-black rounded-md' type="password" id="rCPassword" name="cPassword" value={formState.rCPassword} onChange={onUpdate} placeholder="Confirm your Password" aria-describedby='helpPass'/>
                    {checkPass&&<div className='text-red-100 font-extrabold py-3 text-right w-3/4 text-sm absolute' id="helpPass">Password MissMatch</div>}
                </div>
            </div>
                <div className='flex -mt-3 w-3/5 z-10 px-12 justify-start'>
                    <input className="rounded-md mr-5 p-3 shadow-md border-2 border-white hover:cursor-pointer shadow-black/30 px-6 hover:bg-blue-800 hover:text-white font-bold bg-white text-blue-800 ease-in-out duration-300 hover:scale-110" type='submit' onClick={checkPassword} value='Register'/>
                </div>
        </div>
    </div>
  )
}

export default Register