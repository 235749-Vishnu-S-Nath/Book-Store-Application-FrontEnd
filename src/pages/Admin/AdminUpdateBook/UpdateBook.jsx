import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import axios from "axios";

const UpdateBook = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { isOpen, message, setIsOpen, setMessage } =
    React.useContext(IsOpenContext);

  const { payload, route } = location.state;

  const [series,setSeries] = React.useState(' ')
  const [author,setAuthor] = React.useState(' ')
  const [summary,setSummary] = React.useState(' ')
  const [minAge,setMinAge] = React.useState(0)
  const [maxAge,setMaxAge] = React.useState(0)

  const changeSeries = (event)=>{
    setSeries(event.target.value)
  }
  const changeAuthor = (event)=>{
    setAuthor(event.target.value)

  }
  const changeSummary = (event)=>{
    setSummary(event.target.value)

  }
  const changeMinAge = (event)=>{
    setMinAge(event.target.value)
  }
  const changeMaxAge = (event)=>{
    setMaxAge(event.target.value)
  }

  const updateBook = ()=>{

    const updatePayload = {
      seriesName:series,
      author:author,
      summary:summary,
      minAge:minAge,
      maxAge:maxAge
    }

    axios.put(`http://localhost:9090/api/v1/books/admin/${payload.isbn}`,updatePayload).then(response=>{
      if(response.status===200){
        console.log(response.data)
        setMessage("Successfully Updated")
        setIsOpen(true)
        if (isOpen === false) {
          navigate(`/admin/${route}`)
        }
      }
    }).catch(error=>{
      console.error(error)
    })
  }

  return (
    <div className="w-screen">
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen} />}
      <NavBar home={true} add={true} view={true} update={false} del={true} />
      <div className="w-full flex justify-center items-center p-10">
        <div className="backdrop-blur-md w-fit p-10 mt-7 bg-white/10 grid grid-cols-4 rounded-md">
          <div className="col-span-1">
            <img src={payload.coverArtUrl} className="h-96 max-h-96" />
          </div>
          <div className="col-span-3">
            <div className="w-full p-5 bg-white/10 h-full">
              <h1 className="text-2xl mb-2 font-extrabold">{payload.title}</h1>
              <div className="flex w-full justify-evenly items-center flex-col h-3/4">
                <input className="w-11/12 p-2 rounded-md my-1 text-slate-800" type="text" onChange={changeSeries} placeholder="Update Series" />
                <input className="w-11/12 p-2 rounded-md my-1 text-slate-800" type="text" onChange={changeAuthor} placeholder="Update Author"/>
                <input className="w-11/12 p-2 rounded-md my-1 text-slate-800" type="text" onChange={changeSummary} placeholder="Update Summary"/>
                <input className="w-11/12 p-2 rounded-md my-1 text-slate-800" type="text" onChange={changeMinAge} placeholder="Update Min Age"/>
                <input className="w-11/12 p-2 rounded-md my-1 text-slate-800" type="text" onChange={changeMaxAge} placeholder="Update Max Age"/>
              </div>
              <div className="w-full h-1/6 mt-2 p-5 px-8 flex justify-end items-end">
                <button
                  onClick={updateBook}
                  className="p-2 backdrop-blur-sm hover:cursor-pointer text-white font-bold bg-white/10 rounded-md w-2/12 hover:bg-white hover:text-blue-900 hover:scale-110 ease-in-out duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
