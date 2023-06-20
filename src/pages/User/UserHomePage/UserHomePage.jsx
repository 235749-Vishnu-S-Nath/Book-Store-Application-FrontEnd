import axios from "axios";
import React from "react";
import UserNavBar from "../../../components/NavBar/UserNavBar";

const UserHomePage = () => {
  const [categories, setCategories] = React.useState([]);
  const [values, setValues] = React.useState(null);
  React.useEffect(() => {
    axios
      .post("http://localhost:8100/api/v1/users/books/filter", categories)
      .then((response) => {
        setValues(response.data.bookDtoList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-screen h-screen">
      <UserNavBar home={false} readList={true} ratings={true} />
      {values && <div className="w-full h-5/6 p-5 pt-10 flex justify-center items-center">
        <div className=" w-11/12 h-full p-10 bg-white/30 rounded-md overflow-y-scroll grid grid-cols-5 gap-10">
          {values.map(element=>{
            return(
              <div className="w-full h-64 p-5 bg-white/30 rounded-md">
                <img className="w-full max-h-full hover:scale-110 duration-100 ease-in-out" src={element.coverArtUrl}/>
              </div>
            )
          })}
        </div>
        </div>}
    </div>
  );
};

export default UserHomePage;
