import React, { useContext, useState } from "react";
import loginRequest from "../api/loginRequest";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
const LoginPage = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(TokenContext) || [null, () => {}];

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginRequest(password)
      .then((token) => {
        setToken(token);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-[34px]">Hello!</h1>
      <h2 className="text-[27px] border-b-2 mb-2">Please login in</h2>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col w-[80%] gap-3 mt-4 justify-center"
      >
        {error ? <div className=" text-red-600 h-5 w-full">{error}</div> : ""}

        <input
          type="password"
          placeholder="Password..."
          className=" outline-none pl-4 h-16 bg-zinc-100
        rounded-tl-md rounded-tr-md shadow-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Add"
          className="border-2 border-zinc-400 hover:border-black
        duration-500 text-zinc-600 hover:text-black
        rounded-md w-20 h-12 text-[17px] font-medium"
        />
      </form>
    </div>
  );
};

export default LoginPage;
