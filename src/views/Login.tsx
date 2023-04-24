import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const backgroundImage = "url('src/assets/landingpage.png')"
    return (
    <div style={{backgroundImage, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%"}} className="flex flex-row h-screen w-screen p-8">
      <div className="basis-1/2">
        <h1 className="">Bienvenido</h1>
        <img className="h-50"></img>
      </div>
      <div className="basis-1/2 flex-start pt-20">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
