import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IsOpenContext } from "../Context/IsOpenContext";

const NavBar = ({home,add,view,update,del}) => {
  const navigate = useNavigate();
  const {setMessage,setIsOpen} = React.useContext(IsOpenContext)

  const logout=()=>{
    localStorage.clear();
    setMessage("Logged Out")
    setIsOpen(true)
    navigate("/login")
  }

  return (
    <div className="w-screen flex py-2 backdrop-blur-lg justify-between rounded-md mb-10">
      <div className="logo w-8/12 flex items-center">
        <div className="p-2 px-4 pl-10 hover:cursor-pointer" onClick={()=>navigate('/')}>
          <h1 className="text-6xl font-extrabold LOGO">
            ReadEasy
          </h1>
        </div>
        <div className="ml-10 flex">
          {home&&<Link className="mx-3 w-24 text-center hover:font-bold hover:text-white hover:scale-105 p-2 px-3 ease-in-out duration-300 bg-white/10 rounded-md" to="/admin">Home</Link>}
          {add&&<Link className="mx-3 w-24 text-center hover:font-bold hover:text-white hover:scale-105 p-2 px-3 ease-in-out duration-300 bg-white/10 rounded-md" to="/admin/adminAdd">Add</Link>}
          {view&&<Link className="mx-3 w-24 text-center hover:font-bold hover:text-white hover:scale-105 p-2 px-3 ease-in-out duration-300 bg-white/10 rounded-md" to="/admin/adminView">View</Link>}
          {update&&<Link className="mx-3 w-24 text-center hover:font-bold hover:text-white hover:scale-105 p-2 px-3 ease-in-out duration-300 bg-white/10 rounded-md" to="/admin/adminUpdate">Update</Link>}
          {del&&<Link className="mx-3 w-24 text-center hover:font-bold hover:text-white hover:scale-105 p-2 px-3 ease-in-out duration-300 bg-white/10 rounded-md" to="/admin/adminDelete">Delete</Link>}
        </div>
      </div>
      <div className="nav flex justify-end px-16 items-center w-4/12">
        <div
          className="backdrop-blur-sm text-white hover:cursor-pointer font-bold bg-white/10 ease-in-out duration-300 rounded-md p-2 w-6/12 hover:bg-white hover:text-blue-900"
          onClick={logout}
        >
          <h3 className="text-center hover:cursor-pointer">Log-out</h3>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
