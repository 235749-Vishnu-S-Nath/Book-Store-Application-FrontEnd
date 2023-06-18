import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register/Register'
import LoginPage from './pages/Login/LoginPage'
import AdminHomePage from './pages/Admin/AdminHomePage/AdminHomePage'
import UserHomePage from './pages/UserHomePage/UserHomePage'
import LandingPage from './pages/LandingPage/LandingPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import AdminAddBook from './pages/Admin/AdminAddBook/AdminAddBook'
import { IsOpenContext } from './components/Context/IsOpenContext'
import AdminViewBook from './pages/Admin/AdminViewBook/AdminViewBook'
import AdminUpdateBook from './pages/Admin/AdminUpdateBook/AdminUpdateBook'
import AdminDeleteBook from './pages/Admin/AdminDeleteBook/AdminDeleteBook'
import ViewBook from './pages/ViewBook/ViewBook'

function App() {

  const [isOpen,setIsOpen]= React.useState(false);
  const [message,setMessage] = React.useState('')

  return(
    <IsOpenContext.Provider value={{isOpen,setIsOpen,message,setMessage}}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/admin'>
          <Route index element={<AdminHomePage/>} />
          <Route path='/admin/adminAdd' element={<AdminAddBook/>} />
          <Route path='/admin/adminView' element={<AdminViewBook/>} />
          <Route path='/admin/adminUpdate' element={<AdminUpdateBook/>} />
          <Route path='/admin/adminDelete' element={<AdminDeleteBook/>} />
        </Route>
        <Route path='/viewPage' element={<ViewBook></ViewBook>}/>
        <Route path='/user' element={<UserHomePage />} />
        <Route path='/forgot' element={<ForgotPassword />} />
      </Routes>
    </IsOpenContext.Provider>
  )
}

export default App
