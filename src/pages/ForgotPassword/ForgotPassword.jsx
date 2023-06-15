import React from 'react'
import MainNavBar from '../../components/NavBar/MainNavBar'

const ForgotPassword = () => {
  return (
      <div className='w-screen h-screen'>
          <MainNavBar login={true} register={true} home={true} />
        <div className='w-full mt-28 max-w-md mx-auto p-6'>
            <div className='mt-7 backdrop-blur-md bg-white/30  rounded-xl'>
                <div className='p-4 sm:p-7'>
                    <div className='text-center'>
                        <h1 className='block text-2xl font-bold '>Forgot password?</h1>
                    </div>
                    <div className='mt-5'>
                        <form>
                            <div className='grid gap-y-4'>
                                <div>
                                    <label for="email" className="block text-sm font-bold ml-1 mb-2">Email address</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" className="py-3 px-4 text-black block w-full border-2 border-gray-200 rounded-md text-sm" required aria-describedby="email-error" />
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div>
                                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-white hover:cursor-pointer shadow-black/30 bg-white text-slate-700 font-bold hover:bg-slate-700 hover:text-white">Reset password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default ForgotPassword