import axios from "axios";
import React from "react";
import BookList from "../../../components/BookList/BookList";
import NavBar from "../../../components/NavBar/NavBar";
import PopUp from "../../../components/PopUp/PopUp";

const AdminAddBook = () => {
  const [options, setOptions] = React.useState({
    method: "GET",
    url: "https://book-finder1.p.rapidapi.com/api/search",
    params: {
      results_per_page: "100",
    },
    headers: {
      "X-RapidAPI-Key": "aad86beddfmsh65e8913502e5265p1c4bf3jsn503674fbd80a",
      "X-RapidAPI-Host": "book-finder1.p.rapidapi.com",
    },
  });
  
  const [onClickState,setOnClickState]=React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isOpen,setIsOpen]= React.useState(false);
  const [message,setMessage] = React.useState('')

  const [checkedValue, setCheckedValue] = React.useState({
    "Animals, Bugs & Pets": false,
    "Art, Creativity & Music": false,
    "General Literature": false,
    "Hobbies, Sports & Outdoors": false,
    "Science Fiction & Fantasy": false,
    "Real Life": false,
    "Science & Technology": false,
    "Mystery & Suspense": false,
    Reference: false,
  });

  const addString = () => {
    
    const updatedList = []
    if (checkedValue["Animals, Bugs & Pets"] === true) {
      updatedList.push("Animals, Bugs & Pets")
    }
    if (checkedValue["Art, Creativity & Music"] === true) {
      updatedList.push("Art, Creativity & Music")
    }
    if (checkedValue["General Literature"] === true) {
      updatedList.push("General Literature")
    }
    if (checkedValue["Hobbies, Sports & Outdoors"] === true) {
      updatedList.push("Hobbies, Sports & Outdoors")
    }
    if (checkedValue["Mystery & Suspense"] === true) {
      updatedList.push("Mystery & Suspense")
    }
    if (checkedValue["Real Life"] === true) {
      updatedList.push("Real Life")
    }
    if (checkedValue.Reference === true) {
      updatedList.push("Reference")
    }
    if (checkedValue["Science & Technology"] === true) {
      updatedList.push("Science & Technology")
    }
    if (checkedValue["Science Fiction & Fantasy"] === true) {
      updatedList.push("Science Fiction & Fantasy")
    }
    return updatedList.join('; ')
  };

  React.useEffect(() => {
    console.log(options)
    axios.request(options).then(response=>{
      if(response.data.total_results!=0){
        setValue(response.data.results)
      }
      else{
        setMessage('No Records Found')
        setIsOpen(true)
      }
    }).catch(error=>{
      console.error(error)
    })
  },[onClickState]);

  const CategoryData =() => {
    setOnClickState(prev=>!prev)
    setOptions(prev=>{
      return{
        ...prev,
      params:{
        ...prev.params,
        'categories':addString()
      }
      }
    })
  };

  const checkedValues = (event) => {
    const { value, checked } = event.target;
    setCheckedValue((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  const onChangeEvent = (event) => {
    setOptions((prev) => {
      return {
        ...prev,
        params: {
          ...prev.params,
          results_per_page: "100",
        },
      };
    });
    saveInput(event);
  };
  
  const saveInput = (event) => {
    const { id, value } = event.target;
    if (!value) {
      delete options.params[id];
    } else {
      setOptions((prev) => {
        return {
          ...prev,
          params: {
            ...prev.params,
            [id]: value,
          },
        };
      });
    }
  };
  
  return (
    <div className="w-screen h-screen">
      {isOpen&&<PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
      <NavBar />
      <div className="w-full flex h-4/5 p-4 px-5">
        <div className="w-1/2 mt-5 ml-4 h-fit rounded-md bg-white/30 p-10 flex flex-col">
          <div className="mb-5">
            <input
              type="text"
              id="title"
              className="text-black w-full p-2 px-4 rounded-md"
              onChange={onChangeEvent}
              placeholder="Title (Optional)"
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="author"
              className="text-black w-full p-2 px-4 rounded-md"
              onChange={onChangeEvent}
              placeholder="Author (Optional)"
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="series"
              className="text-black w-full p-2 px-4 rounded-md"
              onChange={onChangeEvent}
              placeholder="Series (Optional)"
            />
          </div>
          <div className="mb-5">
            <select
              className="w-full p-3 rounded-md border-r-8 border-white text-black/50"
              id="book_type"
              onChange={onChangeEvent}
            >
              <option className="p-5" value="">
                Book Type (Optional)
              </option>
              <option className="p-5" value="fiction">
                Fiction
              </option>
              <option className="p-5" value="nonfiction">
                Non-Fiction
              </option>
            </select>
          </div>
          <div className="mb-5">
            <div className="grid grid-cols-2 gap-4 bg-black/30 p-5 rounded-md">
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="c1"
                    value="Animals, Bugs & Pets"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c1"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Animals, Bugs & Pets
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c2"
                    value="Art, Creativity & Music"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c2"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Art, Creativity & Music
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c3"
                    value="General Literature"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c3"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    General Literature
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c4"
                    value="Hobbies, Sports & Outdoors"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c4"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Hobbies, Sports & Outdoors
                  </label>
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="c5"
                    value="Science Fiction & Fantasy"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c5"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Science & Fantasy
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c6"
                    value="Real Life"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c6"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Real Life
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c7"
                    value="Science & Technology"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c7"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Science & Technology
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c8"
                    value="Mystery & Suspense"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c8"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Mystery & Suspense
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="c9"
                    value="Reference"
                    onChange={checkedValues}
                  />
                  <label
                    htmlFor="c9"
                    className="ml-2 text-white font-extrabold text-sm"
                  >
                    Reference
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={CategoryData}
            className="p-2 backdrop-blur-sm hover:cursor-pointer text-slate-700 font-bold bg-white/30 rounded-md w-full hover:bg-slate-700 hover:text-white"
          >
            Search
          </button>
        </div>
        <div className="w-full mt-5 max-h-full flex justify-center items-center">
          <div className="w-5/6 h-full rounded-md bg-white/30 scroll-smooth overflow-y-scroll p-3">
            {value && <BookList v={value} add={true} view={true} setMessage={setMessage} setIsOpen={setIsOpen}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddBook;
