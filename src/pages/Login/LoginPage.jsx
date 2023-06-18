import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainNavBar from "../../components/NavBar/MainNavBar";
import { IsOpenContext } from "../../components/Context/IsOpenContext";
import PopUp from "../../components/PopUp/PopUp";

function LoginPage() {
  const { message, isOpen, setMessage, setIsOpen } =
    React.useContext(IsOpenContext);

  const navigation = useNavigate();
  const [userState, setUserState] = React.useState(null);
  const [loginState, setLoginState] = React.useState({
    username: "",
    password: "",
  });

  const onChangeLogin = (event) => {
    const { id, value } = event.target;
    setLoginState((preData) => {
      return {
        ...preData,
        [id]: value,
      };
    });
  };

  const onClickLogin = () => {
    console.log(loginState);
    axios
      .post("http://localhost:8000/api/v1/users/login", loginState)
      .then((response) => {
        if (response.status === 200) {
          setUserState(response.data.role);
        }
      })
      .catch(()=>{
        setMessage("Invalid Login Credentials")
        setIsOpen(true)
      });
  };

  const reroute = () => {
    userState === "ADMIN" ? navigation("/admin") : navigation("/user");
  };

  return (
    <div className="w-screen h-screen">
      {isOpen && <PopUp message={message} setIsOpen={setIsOpen}></PopUp>}
      <MainNavBar login={false} register={true} home={true} />
      <div className="w-full h-3/4 flex justify-center items-center flex-col">
        <h1 className="font-extrabold text-5xl p-3 w-3/5">Login</h1>
        <div className="rounded-md backdrop-blur-md p-5 bg-white/30 w-3/5">
          <div className="w-full h-full p-6 flex items-center justify-center flex-col">
            <div className="mb-4 w-4/5">
              <input
                type="text"
                className="w-full p-3 px-5 text-black rounded-md"
                id="username"
                name="username"
                onChange={onChangeLogin}
                value={loginState.username}
                placeholder="Username"
              />
            </div>
            <div className="w-4/5">
              <input
                type="password"
                className="w-full p-3 px-5 text-black rounded-md"
                id="password"
                name="password"
                onChange={onChangeLogin}
                value={loginState.password}
                placeholder="Password"
              />
            </div>
            <p className="pt-3">
              Forgot your Password?{" "}
              <span>
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigation("/forgot");
                  }}
                >
                  Click here
                </a>
              </span>
            </p>
          </div>
          <div className="flex w-full justify-end">
            <input
              className="rounded-md mr-5 p-3 shadow-md border-2 border-white hover:cursor-pointer shadow-black/30 px-6 hover:bg-slate-700 hover:text-white font-bold hover:scale-105 bg-white text-slate-700"
              type="button"
              onClick={onClickLogin}
              value="Login"
            />
            {userState && reroute()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
