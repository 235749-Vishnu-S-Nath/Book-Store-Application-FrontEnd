import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axios from "axios";
import BookList from "../../../components/BookList/BookList";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import PopUp from "../../../components/PopUp/PopUp";

const ViewBooks = () => {
  const [value, setValue] = React.useState(null);

  const { message, isOpen, setMessage, setIsOpen } =
    React.useContext(IsOpenContext);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:9090/api/v1/books/admin")
      .then((response) => {
        console.log(response.data)
        if (response.data!='') {
          setValue(response.data.bookDtoList);
        } else {
          setMessage("No Books Added");
          setIsOpen(true);
        }
      })
      .catch(() => {
        setMessage("No Books Added");
        setIsOpen(true);
      });
  }, []);

  const saveInput = (event) => {
    setSearchValue(event.target.value);
  };

  const getData = () => {
    axios
      .get(
        `http://localhost:9090/api/v1/books/user/title?title=${searchValue}`
      )
      .then((response) => {
        if (response.status === 200) {
          setValue(response.data.bookDtoList);
        }
        else{
          setMessage("No Book Found");
          setIsOpen(true);
        }
      })
      .catch(() => {
        setMessage("No Book Found");
        setIsOpen(true);
      });
  };

  return (
    <div className="w-screen h-screen">
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
      <NavBar home={true} add={true} view={false} update={true} del={true} />
      <div className="w-full h-4/5 flex justify-center flex-col items-center">
        <div className="w-10/12 p-2 py-10">
          <input className="p-2 w-1/2 text-slate-800" onChange={saveInput} type="text" />
          <button
            onClick={getData}
            className="p-2 ml-3 backdrop-blur-sm hover:cursor-pointer text-white font-bold ease-in-out duration-300 bg-white/10 rounded-md w-1/12 hover:bg-white hover:text-blue-900"
          >
            Search
          </button>
        </div>
        <div className="w-10/12 h-full overflow-y-scroll">
          {value && <BookList v={value} add={false} view={true} update={false} del={false}/>}
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
