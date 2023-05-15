import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { User } from "../models/user";
import axios from "axios";
import * as UsersApi from  "../network/users_api";

import design from "../assets/landingpage.png";


const Login = () => {
  const [user, setUser] = useState<User[]>([]);
  return (
    <div
      className="flex flex-row h-screen w-screen p-8 justify-center bg-gradient-to-r from-sky-500 to-indigo-500"
    >
      <div className="flex flex-row align-middle  pt-20">
        <LoginForm />
        <img src={design} className="h-96 max-h-96 rounded-r-lg"/>
      </div>
    </div>
  );
};

export default Login;
