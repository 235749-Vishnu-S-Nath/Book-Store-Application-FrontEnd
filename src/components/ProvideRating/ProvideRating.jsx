import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProvideRating.css";
import { IsOpenContext } from "../Context/IsOpenContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProvideRating = ({ setIsRatingOpen, book, update }) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const { setIsOpen, setMessage } = React.useContext(IsOpenContext);
  const navigate = useNavigate();

  const handleRatingSelect = (ratingValue) => {
    if (rating === ratingValue) {
      setRating(0);
    } else {
      setRating(ratingValue);
    }
  };

  const saveReview = (event) => {
    setReview(event.target.value);
  };

  const ratingFn = () => {
    const payload = {
      username: localStorage.getItem("username"),
      isbn: book.isbn,
      rating: rating,
      review: review,
    };
    if (update) {
      axios
        .put("http://localhost:9090/api/v1/rating/update", payload)
        .then((response) => {
          if (response.status === 200) {
            setMessage("Successfully Updated");
            setIsOpen(true);
            setIsRatingOpen(false)
            navigate("/user");
          }
        })
        .catch(() => {
          setMessage("Server error");
          setIsOpen(true);
          setIsRatingOpen(false)
          navigate("/user");
        });
    } else {
      axios
        .post("http://localhost:9090/api/v1/rating", payload)
        .then((response) => {
          if (response.status === 200) {
            setMessage("Successfully Rated");
            setIsOpen(true);
            setIsRatingOpen(false)
            navigate("/user");
          }
        })
        .catch(() => {
          setMessage("Server error");
          setIsOpen(true);
          setIsRatingOpen(false)
          navigate("/user");
        });
    }
  };

  return (
    <div className="absolute z-10 top-0 left-0 w-screen h-screen backdrop-blur-md bg-white/30 flex justify-center items-center">
      <div className="w-3/4 h-2/3 flex justify-center flex-col items-center border-2 border-slate-700 rounded-lg p-10 bg-slate-700">
        <h1 className="mb-10 text-3xl font-bold text-white">{book.title}</h1>
        <div className="w-full starRating flex justify-center items-center">
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <button
              key={ratingValue}
              onClick={() => handleRatingSelect(ratingValue)}
              className={rating >= ratingValue ? "active w-20" : "w-20"}
            >
              <FontAwesomeIcon
                icon={faStar}
                className="w-full h-full relative z-10"
              />
            </button>
          ))}
        </div>
        <div className="w-full h-60 p-5 ">
          <textarea
            className="w-full h-full rounded-md p-2"
            onChange={saveReview}
          ></textarea>
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={() => setIsRatingOpen(false)}
            className="mx-3 text-white font-bold hover:bg-white hover:text-slate-700 px-5 py-1 border-white border-2 rounded-md mb-2"
          >
            Cancel
          </button>
          <button
            onClick={ratingFn}
            className="mx-3 text-white font-bold hover:bg-white hover:text-slate-700 px-5 py-1 border-white border-2 rounded-md mb-2"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProvideRating;
