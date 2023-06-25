import React from 'react'
import MainNavBar from '../../components/NavBar/MainNavBar'

const LandingPage = () => {
  return (
    <div className='w-full h-full'>
        <MainNavBar login={true} register={true} home={false}/>
        <div className='w-full flex justify-center mt-20'>
          <div className=' w-9/12 h-full p-5 backdrop-blur-md rounded-md bg-white/30'>
            <h1 className='text-5xl'>Discover Your Next Adventure at <span className='font-extrabold'>ReadEasy</span>!</h1>
            <h2 className='text-xl py-4'>Explore a Vast Collection of Books and Unleash Your Imagination.</h2>
            <div className='flex p-5 justify-evenly'>
              <section className='rounded-md bg-white/30 p-5 w-1/2 flex items-center'>
                <p className='py-3'>At <span className='font-extrabold'>ReadEasy</span>, we believe that books 
                have the power to inspire, educate, and entertain. Whether you're an avid reader or just starting your 
                literary journey, our vast collection of books across various genres is sure to satisfy your reading 
                cravings.</p>
              </section>

              <section className='rounded-md bg-white/30 p-5 '>
                <h3 className='text-3xl py-3'>Key Features</h3>
                <ul className='p-3'>
                  <li>Extensive Book Collection</li>
                  <li>User-Friendly Interface</li>
                  <li>Add to your Read List</li>
                  <li>Express your thoughts by rating the books</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <footer className='h-12 bg-white/30 absolute bottom-0 flex items-center p-2 px-5 w-full'>
          <p>Contact us at <a href="mailto:vishnusnath447@gmail.com">info@example.com</a></p>
        </footer>
    </div>
  )
}

export default LandingPage