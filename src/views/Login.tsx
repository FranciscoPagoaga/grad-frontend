import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { User } from "../models/user";
import axios from "axios";
import * as UsersApi from  "../network/users_api";



const Login = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        await axios
          .get("/api/users")
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => console.error(`Error: ${error}`));
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadUsers();
    console.log(user);
  }, []);

  const backgroundImage = "url('src/assets/landingpage.png')";
  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="flex flex-row h-screen w-screen p-8"
    >
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
