import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register/Register'
import LoginPage from './pages/Login/LoginPage'
import AdminHomePage from './pages/Admin/AdminHomePage/AdminHomePage'
import UserHomePage from './pages/User/UserHomePage/UserHomePage'
import LandingPage from './pages/LandingPage/LandingPage'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import AdminAddBook from './pages/Admin/AdminAddBook/AdminAddBook'
import { IsOpenContext } from './components/Context/IsOpenContext'
import ViewBooks from './pages/Admin/AdminViewBook/ViewBooks'
import AdminUpdateBook from './pages/Admin/AdminUpdateBook/AdminUpdateBook'
import UpdateBook from './pages/Admin/AdminUpdateBook/UpdateBook'
import AdminDeleteBook from './pages/Admin/AdminDeleteBook/AdminDeleteBook'
import ViewBook from './pages/ViewBook/ViewBook'
import DeleteBook from './pages/Admin/AdminDeleteBook/DeleteBook'

function App() {

  const [isOpen,setIsOpen]= React.useState(false);
  const [message,setMessage] = React.useState('');

  const [isLoading,setIsLoading] = React.useState(false);

  return(
    <IsOpenContext.Provider value={{isOpen,setIsOpen,message,setMessage,isLoading,setIsLoading}}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/admin'>
          <Route index element={<AdminHomePage/>} />
          <Route path='/admin/adminAdd' element={<AdminAddBook/>} />
          <Route path='/admin/adminView' element={<ViewBooks/>} />
          <Route path='/admin/adminUpdate' element={<AdminUpdateBook/>} />
          <Route path='/admin/adminDelete' element={<AdminDeleteBook/>} />
          <Route path='/admin/viewPage' element={<ViewBook />}/>
          <Route path='/admin/update' element={<UpdateBook />}/>
          <Route path='/admin/delete' element={<DeleteBook />}/>
        </Route>
        <Route path='/user' element={<UserHomePage />} />
        <Route path='/forgot' element={<ForgotPassword />} />
      </Routes>
    </IsOpenContext.Provider>
  )
}

export default App
