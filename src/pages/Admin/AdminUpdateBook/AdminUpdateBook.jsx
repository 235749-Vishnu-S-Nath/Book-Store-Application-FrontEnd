import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'

const AdminUpdateBook = () => {
  return (
    <div className='w-full h-full'>
        <NavBar home={true} add={true} view={true} update={false} del={true}/>
    </div>
  )
}

export default AdminUpdateBook