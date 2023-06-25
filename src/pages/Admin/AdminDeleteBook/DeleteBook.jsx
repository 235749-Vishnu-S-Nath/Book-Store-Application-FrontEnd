import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import PopUp from "../../../components/PopUp/PopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { isOpen, message, setIsOpen, setMessage } =
    React.useContext(IsOpenContext);

  const { payload, route } = location.state;

  const deleteBook = () => {
    axios
      .delete(`http://localhost:9090/api/v1/books/admin/${payload.isbn}`)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Book Deleted Successfully");
          setIsOpen(true);
          if (isOpen === false) {
            navigate(`/admin/${route}`)
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen h-screen">
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen} />}
      <NavBar home={true} add={true} view={true} update={true} del={false} />
      <div className="w-full flex justify-center items-center p-10">
        <div className="backdrop-blur-md bg-white/30 p-10 w-11/12 rounded-md grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <img src={payload.coverArtUrl} className="h-96 max-h-96" />
          </div>
          <div className="col-span-3">
            <div className="w-full p-5 bg-white/50 h-full">
              <h1 className="text-2xl mb-6 font-extrabold">{payload.title}</h1>
              {payload.isbn && (
                <h3 className="font-bold">
                  ISBN: <span className="ml-3 font-light">{payload.isbn}</span>
                </h3>
              )}
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
              {payload.copyright != 0 ? (
                <h3 className="font-bold">
                  Copyright:{" "}
                  <span className="ml-3 font-light">{payload.copyright}</span>
                </h3>
              ) : null}
              {payload.binding && (
                <h3 className="font-bold">
                  Binding:{" "}
                  <span className="ml-3 font-light">{payload.binding}</span>
                </h3>
              )}
              {payload.language && (
                <h3 className="font-bold">
                  Language:{" "}
                  <span className="ml-3 font-light">{payload.language}</span>
                </h3>
              )}
              {payload.lexile && (
                <h3 className="font-bold">
                  Lexile:{" "}
                  <span className="ml-3 font-light">{payload.lexile}</span>
                </h3>
              )}
              <div className="w-full h-2/6 p-5 flex justify-end items-end">
                <button
                  onClick={deleteBook}
                  className="p-2 mb-3 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md w-2/12 hover:bg-slate-700 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
