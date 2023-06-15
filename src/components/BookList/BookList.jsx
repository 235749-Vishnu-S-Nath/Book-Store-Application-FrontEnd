import React from "react";
import axios from "axios";

const BookList = (value) => {
  const saveBook = (element) => {
    const payload = {
      isbn: element.published_works[0].isbn,
      title: element.title,
      author: element.authors[0],
      summary: element.summary,
      language: element.language,
      pageCount: element.page_count,
      publishYear: element.copyright,
      imageUrl: element.published_works[0].cover_art_url,
    };
    axios
      .post("http://localhost:8100/api/v1/admin/books/add", payload)
      .then((response) => {
        if (response.status === 201) {
          console.log("Added to db");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return value.v.map((element, index) => {
    return (
      <div
        className="flex flex-row justify-evenly border-2 border-slate-700 p-3 m-2 bg-white/70"
        key={index}
      >
        <h1 className="w-2/4 p-2">{element.title}</h1>
        <h2 className="w-1/4 p-2">{element.authors[0]}</h2>
        <div className="w-1/4 p-2 flex justify-end">
          <button
            // onClick={() => saveBook(element)}
            className="w-1/2 p-2 mx-2 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md hover:bg-slate-700 hover:text-white flex justify-evenly items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View
          </button>
          <button
            onClick={() => saveBook(element)}
            className="w-1/2 p-2 mx-2 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md hover:bg-slate-700 hover:text-white flex justify-evenly items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    );
  });
};

export default BookList;
