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
    <div className="w-screen flex py-2 backdrop-blur-lg justify-between rounded-md">
      <div className="logo w-8/12 flex items-center">
        <div className="p-2 px-4 pl-10 hover:cursor-pointer" onClick={()=>navigate('/')}>
          <h1 className="text-slate-700 text-6xl font-extrabold LOGO">
            ReadEasy
          </h1>
        </div>
        <div className="ml-10">
          {home&&<Link className="mx-3 hover:font-bold p-2 px-3 bg-white/30 rounded-md" to="/admin">Home</Link>}
          {add&&<Link className="mx-3 hover:font-bold p-2 px-3 bg-white/30 rounded-md" to="/admin/adminAdd">Add</Link>}
          {view&&<Link className="mx-3 hover:font-bold p-2 px-3 bg-white/30 rounded-md" to="/admin/adminView">View</Link>}
          {update&&<Link className="mx-3 hover:font-bold p-2 px-3 bg-white/30 rounded-md" to="/admin/adminUpdate">Update</Link>}
          {del&&<Link className="mx-3 hover:font-bold p-2 px-3 bg-white/30 rounded-md" to="/admin/adminDelete">Delete</Link>}
        </div>
      </div>
      <div className="nav flex justify-end px-16 items-center w-4/12">
        <div
          className="backdrop-blur-sm text-slate-700 hover:cursor-pointer font-bold bg-white/30 rounded-md p-2 w-6/12 hover:bg-slate-700 hover:text-white"
          onClick={logout}
        >
          <h3 className="text-center hover:cursor-pointer">Log-out</h3>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
