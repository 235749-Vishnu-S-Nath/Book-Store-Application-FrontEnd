import axios from "axios";
import React from "react";
import UserNavBar from "../../../components/NavBar/UserNavBar";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PopUp from "../../../components/PopUp/PopUp";
import { IsOpenContext } from "../../../components/Context/IsOpenContext";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserHomePage = () => {

  const [categories, setCategories] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const { message, isOpen, setMessage, setIsOpen ,isLoading,setIsLoading} =
    React.useContext(IsOpenContext);
  const [selectCategories, setSelectCategories] = React.useState({
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

  const changeCategory = (event) => {
    setSelectCategories((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.checked,
      };
    });
  };

  React.useEffect(() => {
    const updatedList = [];
    if (
      !updatedList.includes("Animals, Bugs & Pets") &&
      selectCategories["Animals, Bugs & Pets"] === true
    ) {
      updatedList.push("Animals, Bugs & Pets");
    }
    if (
      !updatedList.includes("Art, Creativity & Music") &&
      selectCategories["Art, Creativity & Music"] === true
    ) {
      updatedList.push("Art, Creativity & Music");
    }
    if (
      !updatedList.includes("General Literature") &&
      selectCategories["General Literature"] === true
    ) {
      updatedList.push("General Literature");
    }
    if (
      !updatedList.includes("Hobbies, Sports & Outdoors") &&
      selectCategories["Hobbies, Sports & Outdoors"] === true
    ) {
      updatedList.push("Hobbies, Sports & Outdoors");
    }
    if (
      !updatedList.includes("Mystery & Suspense") &&
      selectCategories["Mystery & Suspense"] === true
    ) {
      updatedList.push("Mystery & Suspense");
    }
    if (
      !updatedList.includes("Real Life") &&
      selectCategories["Real Life"] === true
    ) {
      updatedList.push("Real Life");
    }
    if (
      !updatedList.includes("Reference") &&
      selectCategories["Reference"] === true
    ) {
      updatedList.push("Reference");
    }
    if (
      !updatedList.includes("Science & Technology") &&
      selectCategories["Science & Technology"] === true
    ) {
      updatedList.push("Science & Technology");
    }
    if (
      !updatedList.includes("Science Fiction & Fantasy") &&
      selectCategories["Science Fiction & Fantasy"] === true
    ) {
      updatedList.push("Science Fiction & Fantasy");
    }
    setCategories(updatedList);
  }, [selectCategories]);

  const navigate = useNavigate()

  const [values, setValues] = React.useState(null);
  React.useEffect(() => {
    setIsLoading(true)
    axios
      .post("http://localhost:9090/api/v1/books/user/filter", categories)
      .then((response) => {
        setIsLoading(false)
        setValues(response.data.bookDtoList);
      })
      .catch((error) => {
        setIsLoading(false)
        setMessage("Server Error")
        setIsOpen(true)
        console.error(error);
      });
  }, [categories]);

  const getData = () => {
    axios
      .get(
        `http://localhost:9090/api/v1/books/user/title?title=${searchValue}`
      )
      .then((response) => {
        if (response.status === 200) {
          setValues(response.data.bookDtoList);
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

  const searchChange = (event) => {
    setSearchValue(event.target.value);
  };


  return (
    <div className="w-screen h-screen overflow-hidden">
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
      {isLoading&&<Loading/>}
      <UserNavBar home={false} readList={true} ratings={true} />
      <div className="w-full flex justify-evenly items-center px-20">
        <div className="w-5/12 py-2">
          <input onChange={searchChange} className="p-2 w-9/12 text-slate-800" type="text" />
          <button onClick={getData} className="ml-4 px-4 backdrop-blur-sm text-white hover:cursor-pointer font-bold bg-white/10 rounded-md p-2 w-1/7 hover:bg-white hover:text-blue-900 hover:scale-105 ease-in-out duration-300">
            Search
          </button>
        </div>
        <div className="nav flex justify-start items-center w-7/12">
          <Menu as="div" className="relative text-left">
            <div>
              <Menu.Button className="px-5 py-2 inline-flex backdrop-blur-sm w-full text-white hover:cursor-pointer font-bold bg-white/10 rounded-md hover:bg-white hover:text-blue-900 hover:scale-105 duration-300">
                Filter
                <ChevronDownIcon
                  className="ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="p-1 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 text-slate-800 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Animals, Bugs & Pets"]}
                          id="Animals, Bugs & Pets"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Animals
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Art, Creativity & Music"]}
                          id="Art, Creativity & Music"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Creativity
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["General Literature"]}
                          id="General Literature"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Literature
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={
                            selectCategories["Hobbies, Sports & Outdoors"]
                          }
                          id="Hobbies, Sports & Outdoors"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Hobbies & Sports
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={
                            selectCategories["Science Fiction & Fantasy"]
                          }
                          id="Science Fiction & Fantasy"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Fiction & Fantasy
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Real Life"]}
                          id="Real Life"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Real Life
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Science & Technology"]}
                          id="Science & Technology"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Science
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Mystery & Suspense"]}
                          id="Mystery & Suspense"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Mystery
                      </label>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <label className="flex justify-between px-5 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={changeCategory}
                          checked={selectCategories["Reference"]}
                          id="Reference"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 mr-5 py-2 text-sm"
                          )}
                        />
                        Reference
                      </label>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {values && (
        <div className="w-full h-3/4 p-5 pt-2 flex justify-center items-center">
          <div className=" w-11/12 h-full p-10 bg-white/10 rounded-md overflow-y-scroll grid grid-cols-5 gap-10">
            {values.map((element, index) => {
              return (
                <div
                  onClick={()=>navigate('/user/viewPage',{state:{isbn:element.isbn,rate:false}})}
                  key={index}
                  className="w-full h-64 p-5 bg-white/10 rounded-md group parent hover:scale-110 ease-in-out duration-100 hover:cursor-pointer"
                >
                  <img
                    className="w-full max-h-full min-h-full hover:scale-110 duration-100 ease-in-out"
                    src={element.coverArtUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomePage;
