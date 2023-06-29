import axios from "axios";
import React from "react";

const Review = ({ isbn, rev }) => {
  const [reviews, setReviews] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`http://localhost:9090/api/v1/rating/reviews?isbn=${isbn}`)
      .then((response) => {
        if (response.status === 200) {
          setReviews(response.data.ratingResponseDtos);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full h-full  flex flex-col justify-evenly">
      <div className="h-4/5 max-h-80 object-contain overflow-y-scroll w-full">
        {reviews === null ? <div>No Reviews Yet</div> : null}
        {reviews &&
          reviews.map((element, index) => {
            return (
              <div key={index} className="py-2 text-white">
                <div className="border-2 mr-3 rounded-lg backdrop:blur-lg bg-blue-900/70 border-blue-500/30 p-5 flex flex-col">
                  <div className="flex items-center font-extrabold">
                    <h1 className="pr-2">From:</h1>
                    {element.username}
                  </div>
                  <div className="border-2 rounded-lg p-2 border-blue-500/30 my-2">
                    {element.review}
                  </div>
                  <div className="flex items-center font-extrabold">
                    <svg
                      className="text-yellow-500 w-5 h-auto ml-3 mr-1 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                    </svg>
                    {element.rating}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="w-full flex justify-end px-5 items-center">
        <button
          className="flex justify-center bg-white/10 hover:scale-105 ease-in-out duration-300 bg-blend-multiply py-1 px-3 rounded-lg font-black items-center"
          onClick={() => rev(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back to Summary
        </button>
      </div>
    </div>
  );
};
export default Review;
