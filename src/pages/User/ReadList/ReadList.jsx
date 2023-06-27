import React from "react";
import UserNavBar from "../../../components/NavBar/UserNavBar";
import Loading from "../../../components/Loading/Loading";
import PopUp from "../../../components/PopUp/PopUp";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReadList = () => {
  const { message, isOpen, setMessage, setIsOpen, isLoading, setIsLoading } =
    React.useContext(IsOpenContext);
  const [readList, setReadList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:9090/api/v1/readlist/getfavourites?username=${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.bookDtoList);
        if (response.status === 200) {
          setReadList(response.data.bookDtoList);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          setMessage("No Book Added to Collection");
          setIsOpen(true);
          navigate("/user")
        } else {
          setMessage("Server Error");
          setIsOpen(true);
        }
      });
  }, [isOpen]);

  const viewBook=(isbn)=>{
      navigate('/user/viewPage',{state:{isbn:isbn,rate:true}})
  }

  const deleteFromList = (isbn) => {
    axios
      .delete(
        `http://localhost:9090/api/v1/readlist/removefav?isbn=${isbn}&username=${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          setMessage("Book removed from your list");
          setIsOpen(true);
        }
      })
      .catch(error=>{
        if (error.response.status === 404) {
            setMessage("Book not found");
            setIsOpen(true);
          } else {
            setMessage("Server Error");
            setIsOpen(true);
          }
      });
  };

  return (
    <div className="w-screen h-screen">
      {isLoading && <Loading />}
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen} />}
      <UserNavBar home={true} readList={false} ratings={true} />
      {readList.length && (
        <div className="w-full mt-4 flex justify-center items-center">
          <div className="w-11/12 bg-white/30 p-5 rounded-md">
            <div className="text-4xl font-extrabold p-2 mb-14 rounded-md px-5 text-slate-600">
              <h1>{localStorage.getItem("username")}'s Collection</h1>
            </div>
            <div className="h-10 w-fit font-extrabold text-slate-700 bg-white/50 rounded-md mb-3 p-2 px-5">
              <h1>
                Total No: Books in your Collection:{" "}
                <span>{readList.length}</span>
              </h1>
            </div>
            <div className="w-full h-96 bg-white/50 p-5 overflow-y-scroll">
              {readList.map((element, index) => {
                return (
                  <div
                    key={index}
                    className="w-full mb-4 flex flex-row p-2 border-2 border-slate-700 rounded-md b justify-between items-center"
                  >
                    <img className="h-auto w-24" src={element.coverArtUrl} />
                    <h1 className="font-bold text-xl text-slate-600">
                      {element.title}
                    </h1>
                    <div className="flex flex-col mx-16">
                      <button onClick={()=>viewBook(element.isbn)} className="text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2">
                        View
                      </button>
                      <button
                        onClick={() => deleteFromList(element.isbn)}
                        className="text-slate-800 font-bold hover:bg-slate-700 hover:text-white px-5 py-1 border-slate-700 border-2 rounded-md mb-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadList;
