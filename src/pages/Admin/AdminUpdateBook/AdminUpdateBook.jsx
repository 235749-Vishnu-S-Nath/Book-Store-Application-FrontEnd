import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import axios from "axios";
import BookList from "../../../components/BookList/BookList";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import PopUp from "../../../components/PopUp/PopUp";

const AdminUpdateBook = () => {
  const [value, setValue] = React.useState(null);

  const { message, isOpen, setMessage, setIsOpen } =
    React.useContext(IsOpenContext);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:9090/api/v1/books/admin")
      .then((response) => {
        console.log(response.data);
        if (response.data != "") {
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
        } else {
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
      <NavBar home={true} add={true} view={true} update={false} del={true} />
      <div className="w-full h-4/5 flex justify-center flex-col items-center">
        <div className="w-10/12 p-2 py-10">
          <input className="p-2 w-1/2" onChange={saveInput} type="text" />
          <button
            onClick={getData}
            className="p-2 ml-3 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md w-1/12 hover:bg-slate-700 hover:text-white"
          >
            Search
          </button>
        </div>
        <div className="w-10/12 h-full overflow-y-scroll">
          {value && <BookList v={value} add={false} view={false} update={true} del={false} />}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateBook;
