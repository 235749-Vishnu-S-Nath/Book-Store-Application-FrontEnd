import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookList = ({ v, add, view , setMessage, setIsOpen}) => {
  const navigate = useNavigate();

  const getPayload=(element)=>{
    return{
      isbn:
        element.published_works[0].isbn === null
          ? ""
          : element.published_works[0].isbn,
      title: element.title === null ? "" : element.title,
      seriesName: element.series_name === null ? "" : element.series_name,
      author: element.authors[0] === null ? "" : element.authors[0],
      lexile:
        element.measurements.english.lexile === null
          ? 0
          : element.measurements.english.lexile,
      pageCount: element.page_count === null ? 0 : element.page_count,
      minAge: element.min_age === null ? 0 : element.min_age,
      maxAge: element.max_age === null ? 0 : element.max_age,
      categories: element.categories === null ? [] : element.categories,
      summary: element.summary === null ? "" : element.summary,
      coverArtUrl:
        element.published_works[0].cover_art_url === null
          ? ""
          : element.published_works[0].cover_art_url,
      authorFirstName:
        element.author_first_names[0] === null
          ? ""
          : element.author_first_names[0],
      authorLastName:
        element.author_last_names[0] === null
          ? ""
          : element.author_last_names[0],
      copyright: element.copyright === null ? 0 : element.copyright,
      publishedWorkId:
        element.published_works[0].published_work_id === null
          ? ""
          : element.published_works[0].published_work_id,
      binding:
        element.published_works[0].binding === null
          ? ""
          : element.published_works[0].binding,
      language: element.language === null ? "" : element.language === null
    }
  }


  const saveBook = (element) => {
    const payload = getPayload(element)
    axios
      .post("http://localhost:8100/api/v1/admin/books/add", payload)
      .then((response) => {
        if (response.status === 201) {
          setMessage("Added Successfully")
          setIsOpen(true)
        }
      })
      .catch((error) => {
        if(error.response.status===409){
          setMessage("Book already exists")
          setIsOpen(true)
        }
      });
  };

  const goToView=(element)=>{
    const payload = getPayload(element)
    navigate('/viewPage',{state:{payload,cancel:true,add:true,update:false,del:false,addToRL:false,rate:false}})
  }

  return v.map((element, index) => {
    return (
      <div
        className="flex flex-row justify-between items-center border-2 border-slate-400/60 py-3 pl-3 m-2 bg-white/70"
        key={index}
      >
        <div className="h-36 w-3/4 flex items-center justify-evenly">
          <div className="w-1/4">
            <img
              src={element.published_works[0].cover_art_url}
              className="aspect-auto h-36"
            />
          </div>
          <div className="ml-4 h-full w-full rounded-md px-5 py-1 font-extrabold">
            <h1>{element.title}</h1>
          {element.series_name&&<h3 className="text-sm font-bold flex">Series: <span><p className="text-xs p-0.5 ml-1 font-light">{element.series_name}</p></span></h3>}
          {element.authors[0]&&<h3 className="text-sm font-bold flex">Author: <span><p className="text-xs p-0.5 ml-1 font-light">{element.authors[0]}</p></span></h3>}
          {element.min_age&&element.max_age&&<h3 className="text-sm font-bold flex">Suggest age: <span><p className="text-xs p-0.5 ml-1 font-light">{element.min_age}-{element.max_age}</p></span></h3>}
          {element.categories&&<h3 className="text-sm font-bold flex">Categories: <span><p className="text-xs p-0.5 ml-1 font-light">{element.categories}</p></span></h3>}
          </div>
        </div>
        <div className="w-1/4 p-2 flex flex-col items-center justify-evenly">
          {view && (
            <button onClick={()=>goToView(element)} className="w-1/2 m-2 p-2 mx-2 border-slate-700 border-2 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold rounded-md hover:bg-slate-700 hover:text-white flex justify-evenly items-center">
              View
            </button>
          )}
          {add && (
            <button
              onClick={() => saveBook(element)}
              className="w-1/2 p-2 m2 mx-2 border-2 border-slate-700 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold rounded-md hover:bg-slate-700 hover:text-white flex justify-evenly items-center"
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
