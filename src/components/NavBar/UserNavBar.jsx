import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IsOpenContext } from "../Context/IsOpenContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserNavBar = ({ home, readList, ratings }) => {
  const navigate = useNavigate();
  const {setMessage,setIsOpen} = React.useContext(IsOpenContext);

  const logout = () => {
    localStorage.clear();
    setMessage("Logged Out")
    setIsOpen(true)
    navigate("/login");
  };

  return (
    <div className="w-screen flex py-2 backdrop-blur-lg justify-between rounded-md mb-10">
      <div className="logo w-8/12 flex items-center">
        <div
          className="p-2 px-4 pl-10 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-slate-700 text-6xl font-extrabold LOGO">
            ReadEasy
          </h1>
        </div>
        <div className="pl-10 flex">
          {home && (
            <Link className="mx-3 w-24 text-center hover:font-bold p-2 px-3 ease-in-out duration-300 hover:text-white hover:scale-105 bg-white/10 rounded-md" to="/user">
              Home
            </Link>
          )}
          {readList && (
            <Link className="mx-3 w-24 text-center hover:font-bold p-2 px-3 ease-in-out duration-300 hover:text-white hover:scale-105 bg-white/10 rounded-md" to="/user/readList">
              ReadList
            </Link>
          )}
          {/* {ratings && (
            <Link className="mx-3 w-24 text-center hover:font-bold p-2 px-3 ease-in-out duration-300 hover:text-white hover:scale-105 bg-white/10 rounded-md" to="/user/rating">
              Your Ratings
            </Link>
          )} */}
        </div>
      </div>
      <div className="nav flex justify-end pr-16 items-center w-4/12">
        <Menu as="div" className="relative text-left">
          <div>
            <Menu.Button className="px-5 py-2 inline-flex backdrop-blur-sm w-full text-white hover:cursor-pointer font-bold bg-white/10 hover:bg-white border-2 rounded-lg border-white hover:text-blue-900 ease-in-out duration-300 hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

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
            <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-default"
                      )}
                    >
                      {localStorage.getItem("username")}
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-default"
                      )}
                    >
                      {localStorage.getItem("email")}
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={logout}
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm hover:bg-red-500 hover:text-white cursor-pointer"
                      )}
                    >
                      Log-Out
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default UserNavBar;
