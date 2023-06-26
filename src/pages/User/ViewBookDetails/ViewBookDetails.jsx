import React from "react";
import UserNavBar from "../../../components/NavBar/UserNavBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import Loading from "../../../components/Loading/Loading";
import PopUp from "../../../components/PopUp/PopUp";
import Review from "../Review/Review";
import { useNavigate } from "react-router-dom";
const ViewBookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isbn } = location.state;
  const [book, setBook] = React.useState(null);
  const { message, isOpen, setMessage, setIsOpen, isLoading, setIsLoading } =
    React.useContext(IsOpenContext);
  const [isReview, setIsReview] = React.useState(false);
  const addToReadList = () => {
    const payload = {
      username: localStorage.getItem("username"),
      isbn: isbn,
    };
    axios
      .post("http://localhost:9090/api/v1/readlist/addtofav", payload)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          setMessage("Added Successfully");
          setIsOpen(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setMessage("Already added to WishList");
          setIsOpen(true);
        } else {
          setMessage("Server Error.");
          setIsOpen(true);
        }
      });
    navigate("/user");
  };
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:9090/api/v1/books/user/${isbn}`)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setBook(response.data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          setMessage("Book Not Found.");
          setIsOpen(true);
        } else {
          setMessage("Server Error.");
          setIsOpen(true);
        }
      });
  }, []);
  return (
    <div className="w-screen h-screen">
      {isLoading && <Loading />}
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen} />}
      <UserNavBar home={true} readList={true} ratings={true} />
      {book && (
        <div className="w-full h-5/6 mt-3 p-5">
          <div className="grid w-full h-full max-h-full grid-cols-3 gap-5">
            <div className="col-span-1 h-full max-h-full p-10 bg-white/30 rounded-md">
              <div className="h-4/6 flex justify-center items-center w-full pb-5">
                <img src={book.coverArtUrl} className="h-80 max-h-80" />
              </div>
              <div className="bg-white/50 h-2/6 rounded-md p-5 text-base font-extrabold text-slate-600">
                {book.seriesName && (
                  <h1>
                    Series:{" "}
                    <span className="text-base font-medium">
                      {book.seriesName}
                    </span>
                  </h1>
                )}
                {book.author && (
                  <h1>
                    Author:{" "}
                    <span className="text-base font-medium">{book.author}</span>
                  </h1>
                )}
                {book.categories && (
                  <h1>
                    Categories:{" "}
                    <span className="text-base font-medium">
                      {book.categories}
                    </span>
                  </h1>
                )}
                {book.minAge * book.maxAge != 0 ? (
                  <h1>
                    Age:{" "}
                    <span className="text-base font-medium">
                      {book.minAge}-{book.maxAge}
                    </span>
                  </h1>
                ) : null}
                {book.rating != 0 ? (
                  <h1 className="flex items-center">
                    Rating:
                    <svg
                      className="text-yellow-500 w-5 h-auto ml-3 mr-1 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                    </svg>
                    <span className="text-base font-medium">
                      {Math.round(book.rating * 10) / 10}
                    </span>
                    <span
                      onClick={() => setIsReview(true)}
                      className="text-sm font-medium ml-5 hover:cursor-pointer"
                    >
                      View Review
                    </span>
                  </h1>
                ) : (
                  <span className="text-base font-medium">Not rated yet.</span>
                )}
              </div>
            </div>
            <div className="col-span-2 bg-white/30 p-10 rounded-md">
              <div>
                <h1 className="text-2xl font-extrabold mb-10">{book.title}</h1>
              </div>
              <div className="h-4/5 w-full mb-2 overflow-y-scroll">
                {isReview ? (
                  <Review isbn={book.isbn} rev={setIsReview} />
                ) : (
                  book.summary!=''?<div className="h-4/5 max-h-80">{book.summary}</div>:<h1>No Summary</h1>
                )}
              </div>
              <button
                onClick={addToReadList}
                className="p-2 px-3 border-2 border-red-600 text-white hover:text-red-600 bg-red-600 font-extrabold hover:bg-white rounded-md flex justify-center items-center"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookDetails;
