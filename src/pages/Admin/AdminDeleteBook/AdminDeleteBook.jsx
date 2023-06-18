import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'

const AdminDeleteBook = () => {
  return (
    <div className='w-full h-full'>
        <NavBar home={true} add={true} view={true} update={true} del={false}/>
    </div>
  )
}

export default AdminDeleteBook