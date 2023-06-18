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
  
  const { payload, cancel, add, update, del, addToRL, rate } = location.state;


  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8100/api/v1/admin/books/isbn/${payload.isbn}`).then().catch((error)=>{
  //     console.log(error)
  //     setMessage('Record Not Found')
  //     setIsOpen(true)
  //     if(isOpen===false){
  //       window.history.back()
  //     }
  //   })
  // },[])

  const addFunction = () => {
    axios
      .post("http://localhost:8100/api/v1/admin/books/add", payload)
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
        <div className="backdrop-blur-md w-fit p-10 mt-7 bg-white/30 grid grid-cols-4 rounded-md">
          <div className="flex justify-start w-full col-span-1 items-center">
            <img src={payload.coverArtUrl} className="h-96 max-h-96" />
          </div>
          <div className="p-10 col-span-3 pb-1 w-full bg-white/70">
            <div className="h-5/6 overflow-hidden">
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
                <h3 className="mt-4 font-bold">
                  Summary:{" "}
                  <span className="ml-3 font-light">{payload.summary}</span>
                </h3>
              )}
            </div>
            <div className="h-1/6 flex items-center justify-end">
              {add && (
                <button
                  onClick={addFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                >
                  Add
                </button>
              )}
              {update && (
                <button
                  onClick={updateFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                >
                  Update
                </button>
              )}
              {del && (
                <button
                  onClick={delFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                >
                  Delete
                </button>
              )}
              {addToRL && (
                <button
                  onClick={addToRLFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                >
                  Add to List
                </button>
              )}
              {rate && (
                <button
                  onClick={rateFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                >
                  Rate
                </button>
              )}
              {cancel && (
                <button
                  onClick={cancelFunction}
                  className="mx-3 text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
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
