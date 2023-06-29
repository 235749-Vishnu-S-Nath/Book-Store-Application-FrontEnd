import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IsOpenContext } from "../../components/Context/IsOpenContext";
import PopUp from "../../components/PopUp/PopUp";

const ViewBook = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {isOpen,message,setIsOpen,setMessage} = React.useContext(IsOpenContext)
  
  const { payload, cancel, add, update, del } = location.state;


  const addFunction = () => {
    axios
      .post("http://localhost:9090/api/v1/books/admin/add", payload)
      .then((response) => {
        if (response.status === 201) {
          setMessage("Successfully Added")
          setIsOpen(true)
        }
      })
      .catch((error) => {
        if(error.response.status===409){
          setMessage("Book already exists")
          setIsOpen(true)
        }
      });
    // navigate("/admin/adminAdd");
    window.history.back()
  };

  const cancelFunction = () => {
    window.history.back()
  };

  const updateFunction = () => {
    navigate("/admin/update",{state:{payload,route:'adminView'}});
  };

  const delFunction = () => {
    navigate("/admin/delete",{state:{payload,route:'adminView'}});
  };

  const addToRLFunction = () => {
    // navigate("/admin/adminAdd");
    window.history.back()
  };

  const rateFunction = () => {
    // navigate("/admin/adminAdd");
    window.history.back()
  };

  return (
    <div className="w-screen">
      {isOpen&&<PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
      <NavBar home={true} add={true} view={false} update={true} del={true}/>
      <div className="w-full flex justify-center items-center p-10">
        <div className="backdrop-blur-md w-fit p-10 mt-7 bg-white/10 grid grid-cols-4 rounded-md">
          <div className="flex justify-start w-full col-span-1 items-center">
            <img src={payload.coverArtUrl} className="h-96 max-h-96" />
          </div>
          <div className="p-10 col-span-3 pb-1 max-h-full min-h-full w-full bg-white/10">
            <div className="h-5/6 max-h-80 overflow-y-scroll">
              <h1 className="text-2xl mb-6 font-extrabold">{payload.title}</h1>
              {payload.seriesName && (
                <h3 className="font-bold">
                  Series:{" "}
                  <span className="ml-3 font-light">{payload.seriesName}</span>
                </h3>
              )}
              {payload.author && (
                <h3 className="font-bold">
                  Author:{" "}
                  <span className="ml-3 font-light">{payload.author}</span>
                </h3>
              )}
              {(payload.minAge && payload.maxAge) === 0 ? null : (
                <h3 className="font-bold">
                  Suggested age:{" "}
                  <span className="ml-3 font-light">
                    {payload.minAge}-{payload.maxAge}
                  </span>
                </h3>
              )}
              {payload.pageCount === 0 ? null : (
                <h3 className="font-bold">
                  Pages:{" "}
                  <span className="ml-3 font-light">{payload.pageCount}</span>
                </h3>
              )}
              {payload.categories && (
                <h3 className="font-bold">
                  Categories:{" "}
                  <span className="ml-3 font-light">{payload.categories}</span>
                </h3>
              )}
              {payload.summary && (
                <h3 className="mt-4 h-4/5 font-bold">
                  Summary:{" "}
                  <span className="ml -3 font-light">{payload.summary}</span>
                </h3>
              )}
            </div>
            <div className="h-1/6 flex items-center justify-end">
              {add && (
                <button
                  onClick={addFunction}
                  className="mx-3 hover:scale-105 ease-in-out duration-300 text-white font-bold hover:bg-white hover:text-blue-800 px-5 py-1 border-white border-2 rounded-md mb-2"
                >
                  Add
                </button>
              )}
              {update && (
                <button
                  onClick={updateFunction}
                  className="mx-3 hover:scale-105 ease-in-out duration-300 text-white font-bold hover:bg-white hover:text-blue-800 px-5 py-1 border-white border-2 rounded-md mb-2"
                >
                  Update
                </button>
              )}
              {del && (
                <button
                  onClick={delFunction}
                  className="mx-3 hover:scale-105 ease-in-out duration-300 text-white font-bold hover:bg-white hover:text-blue-800 px-5 py-1 border-white border-2 rounded-md mb-2"
                >
                  Delete
                </button>
              )}
              {cancel && (
                <button
                  onClick={cancelFunction}
                  className="mx-3 hover:scale-105 ease-in-out duration-300 text-white font-bold hover:bg-white hover:text-blue-800 px-5 py-1 border-white border-2 rounded-md mb-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
