import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register/Register'
import LoginPage from './pages/Login/LoginPage'
import AdminHomePage from './pages/Admin/AdminHomePage/AdminHomePage'
import UserHomePage from './pages/UserHomePage/UserHomePage'
import LandingPage from './pages/LandingPage/LandingPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import AdminAddBook from './pages/Admin/AdminAddBook/AdminAddBook'
import ViewBook from './pages/ViewBook/ViewBook'

function App() {

  return(
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/user' element={<UserHomePage />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/adminAdd' element={<AdminAddBook/>} />
        <Route path='/viewPage' element={<ViewBook/>} />
      </Routes>
    </>
  )
}

export default App
