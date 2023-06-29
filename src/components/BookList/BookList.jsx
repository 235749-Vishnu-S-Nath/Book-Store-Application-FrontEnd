import React from "react";
import { useNavigate } from "react-router-dom";

const BookList = ({v,add,view,update,del}) => {

    const navigate = useNavigate()

    const goToView=(element)=>{
        const payload = element
        navigate('/admin/viewPage',{state:{payload,cancel:true,add:false,update:true,del:true}})
    }

    const goToUpdate=(element)=>{
        const payload = element
        navigate('/admin/update',{state:{payload,route:'adminUpdate'}})
    }

    const goToDelete=(element)=>{
        const payload = element
        navigate('/admin/delete',{state:{payload,route:'adminDelete'}})
    }

    const saveBook=()=>{

    }

  return v.map((element, index) => {
    return (
      <div
        className="flex flex-row justify-between items-center border-2 border-white/50 py-3 pl-3 m-2 bg-white/10"
        key={index}
      >
        <div className="h-36 w-3/4 flex items-center justify-evenly">
          <div className="w-1/6 flex justify-center items-center">
            <img
              src={element.coverArtUrl}
              className="aspect-auto h-36"
            />
          </div>
          <div className="ml-4 h-full w-full rounded-md px-5 py-1 font-extrabold">
            <h1>{element.title}</h1>
            {element.seriesName && (
              <h3 className="text-sm font-bold flex">
                Series:{" "}
                <span>
                  <p className="text-xs p-0.5 ml-1 font-light">
                    {element.seriesName}
                  </p>
                </span>
              </h3>
            )}
            {element.author && (
              <h3 className="text-sm font-bold flex">
                Author:{" "}
                <span>
                  <p className="text-xs p-0.5 ml-1 font-light">
                    {element.author}
                  </p>
                </span>
              </h3>
            )}
            {element.minAge*element.maxAge !=0 ? (
              <h3 className="text-sm font-bold flex">
                Suggest age:{" "}
                <span>
                  <p className="text-xs p-0.5 ml-1 font-light">
                    {element.minAge}-{element.maxAge}
                  </p>
                </span>
              </h3>
            ):null}
            {element.categories && (
              <h3 className="text-sm font-bold flex">
                Categories:{" "}
                <span>
                  <p className="text-xs p-0.5 ml-1 font-light">
                    {element.categories}
                  </p>
                </span>
              </h3>
            )}
          </div>
        </div>
        <div className="w-1/4 p-2 flex flex-col items-center justify-evenly">
          {view && (
            <button
              onClick={() => goToView(element)}
              className="w-1/2 m-2 p-2 mx-2 border-white border-2 backdrop-blur-sm hover:cursor-pointer text-white font-bold rounded-md hover:bg-white hover:text-blue-900 hover:scale-105 ease-in-out duration-300 flex justify-evenly items-center"
            >
              View
            </button>
          )}
          {update && (
            <button
              onClick={() => goToUpdate(element)}
              className="w-1/2 m-2 p-2 mx-2 border-white border-2 backdrop-blur-sm hover:cursor-pointer text-white font-bold rounded-md hover:bg-white hover:text-blue-900 hover:scale-105 ease-in-out duration-300 flex justify-evenly items-center"
            >
              Update
            </button>
          )}
          {del && (
            <button
              onClick={() => goToDelete(element)}
              className="w-1/2 m-2 p-2 mx-2 border-white border-2 backdrop-blur-sm hover:cursor-pointer text-white font-bold rounded-md hover:bg-white hover:text-blue-900 hover:scale-105 ease-in-out duration-300 flex justify-evenly items-center"
            >
              Delete
            </button>
          )}
          {add && (
            <button
              onClick={() => saveBook(element)}
              className="w-1/2 p-2 m2 mx-2 border-2 border-white backdrop-blur-sm hover:cursor-pointer text-white font-bold rounded-md hover:bg-white hover:text-blue-900 hover:scale-105 ease-in-out duration-300 flex justify-evenly items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Add
            </button>
          )}
        </div>
      </div>
    );
  });
};

export default BookList;
